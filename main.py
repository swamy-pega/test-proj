#install fastapi
from fastapi import FastAPI, HTTPException,status,Response
from fastapi.middleware.cors import CORSMiddleware

#install uvicorn
from fastapi import Body
from pydantic import BaseModel
from random import randrange
from datetime import datetime
from zoneinfo  import ZoneInfo
#install psycopg
import psycopg
import time
#get database connection
from database import Base, engine,session
#get table model from model
from models import Base, Post,Questions,Answers
# Uncomment the following line if you want to use psycopg2 instead of psycopg8888
#install pydantic
#rom pydantic import model_dump
#install pydantic
from typing import Optional
from apischema import post,questions,questionList
import uuid

Base.metadata.create_all(bind=engine)
app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000",
    "https://your-frontend-domain.com"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],              # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],              # Allows all headers
)


#get db for sqlalchemy
db = session
print("Database connection established successfully"+" "+str(db))
#get_posts=db.query(Post).all()
#get all post db session and sqlalchemy query
@app.get("/posts")
def get_all_posts():
    get_posts=db.query(Post).all()
    if not get_posts:
        return {"error": "No posts found"}
    # Convert the fetched data to a dictionary format
    for post in get_posts:
        post.created_at = post.created_at.astimezone(ZoneInfo("UTC")).isoformat()
    get_posts = [{"id": post.id, "title": post.title, "content": post.content, "created_at": post.created_at} for post in get_posts]
    if not get_posts:
        return {"error": "No posts found"}
    # Return the posts in a dictionary format
    return {"posts": get_posts}
 ########### get post by id  ##########################
@app.get("/post/{id}")
def find_post(id: int):
    get_post=db.query(Post).filter(Post.id == id).first()
    print("get post by id"+str(get_post))   
    if not get_post:
          return Response(status_code=status.HTTP_404_NOT_FOUND, content=f"Post not found with the given ID {id} ")
    # Convert the fetched data to a dictionary format
    return { "post": get_post}

########### create a new post   and insert into db ##########################
@app.post("/posts")
def create_posts(post: post):
    try: 
        new_post = Post(
            title=post.title,
            content=post.content,
            created_at=datetime.now(ZoneInfo("UTC")),
            published=post.published
        )
        db.add(new_post)
        
        # Commit the changes to the database
        
        db.add(new_post)
        db.commit()
        db.refresh(new_post)  # Refresh to get the new ID
        print("###start commiting to the database create posts"+" "+str(new_post.id))
    
        if not new_post:
          raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not added successfully")
          return {"error": "Post not added successfully"}
        #myposts = [{"id": row[0], "title": row[1], "content": row[2], "created_at": row[3]} for row in myposts]
        return {"post": new_post.id, "title": new_post.title, "content": new_post.content, "created_at": new_post.created_at.isoformat(), "published": new_post.published}
    except Exception as e:      
        return {"error": str(e)}
    
 ########### delete post by id  ##########################
@app.delete("/post/{id}")
def delete_post(id: int):
    get_post=db.query(Post).filter(Post.id == id).first()
    if get_post:
        db.delete(get_post)
        db.commit()
        return {"message": "Post deleted successfully", "post": get_post.id}
    else:
        return Response(status_code=status.HTTP_404_NOT_FOUND, content ="Post not found")
    
######### add answrs post by id  ##########################
def add_answers(answers: Answers, id: int):  
    #print("add answers to the database"+"11")
    if not answers:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, content="No answers provided")
    # Assuming 'answer' is a list of Answers objects
    try:
          for answer in answers:
           #print("############each answers add question to the database"+" "+str(answer))
           new_answer = Answers(
            question_id=id,  # Use the provided question ID
            answer_text=answer.answer_text,
            is_correct=answer.is_correct,
            created_at=datetime.now(ZoneInfo("UTC")),
            created_by=answer.created_by
           )
           db.add(new_answer)
          db.commit()
    
    except Exception as e:
        return {"error": str(e)}#db.refresh(new_answer)
   
    #raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, content="Answer not added successfully")
    return {"message": "Answer added successfully", "answer": new_answer.id}
       
       
### add question and answer to the database

### add questions to the datbase
def add_question(question: questions): 
    try:
        #print("@@@@@@@@@@@@@@@add_question call"+question.question_text)
        new_question = Questions(
            question_text=question.question_text,
            created_at=datetime.now(ZoneInfo("UTC")),
            question_type=question.question_type,
            difficulty=question.difficulty,
            topic=question.topic,
            is_active=question.is_active,
            created_by=question.created_by,
            level=question.level,
            explanation=question.explanation
        )
        db.add(new_question)
        db.commit()
        db.refresh(new_question)  # Refresh to get the new ID
        #print("##########else new question"+" "+str(new_question.id))
        if not new_question:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, content="Question not added successfully")
        else:
            #print("##########else new question"+" "+str(new_question.id))
            add_answers(question.answers, new_question.id)  # Assuming each question has a list of answers
        
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/addquestions")
def add_questions(questions: questionList):
    #print("add questions to the database"+" "+str(questions))
    if not questions.question_list:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No questions provided")
    # Assuming 'questions' is a list of Questions objectsan
    questions = questions.question_list  # Extract the list of questions from the request body
    if not isinstance(questions, list):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid data format for questions")
    for question in questions:
    # Assuming 'questions' is a list of Questions objects
     #print("@@@@@############each questions add question to the database"+" "+str(question))
        add_question(question)  # Call the add_question function for each question
        
    # If you want to return a success message after adding all questions
    if not questions:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, content="No questions provided")
    #print("start commiting to the database create questions"+" "+str(questions))
    else:
     #print("############each answers add question to the database")
     return {"message": "Questions added successfully"}

@app.get("/answers/{id}")

def get_anwsers(id: int):
    get_anwsers=db.query(Answers).filter(Answers.question_id == id).all()
    #print("get post by id"+str(get_anwsers))   
    if not get_anwsers:
          return Response(status_code=status.HTTP_404_NOT_FOUND, content=f"answers not found with the given ID {id} ")
    # Convert the fetched data to a dictionary format
    return { "anwers": get_anwsers}
@app.get("/questions")
def get_all_questions():
    get_questions = db.query(Questions).all()
    if not get_questions:
        return {"error": "No questions found"}
    # Convert the fetched data to a dictionary format
    questionList=[]
    for question in get_questions:
         questionitem ={"id":question.id, "question_text": question.question_text,
                          "created_at": question.created_at.astimezone(ZoneInfo("UTC")).isoformat(),
                          "question_type": question.question_type,
                          "difficulty": question.difficulty,
                          "topic": question.topic,
                          "is_active": question.is_active,
                          "created_by": question.created_by,
                          "level": question.level,
                          "explanation": question.explanation} 
         anwers_list = []
         for answer in question.answers:
             answer_item = {
                 "id": answer.id,
                 "question_id": answer.question_id,
                 "answer_text": answer.answer_text,
                 "is_correct": answer.is_correct,
                 "created_at": answer.created_at.astimezone(ZoneInfo("UTC")).isoformat(),
                 "created_by": answer.created_by
             }
             anwers_list.append(answer_item)
         questionitem["answers"] = anwers_list
         
         
         questionList.append(questionitem)
                        
     
        #question.created_at = question.created_at.astimezone(ZoneInfo("UTC")).isoformat()
     #get_questions = [{"id": question.id, "question_text": question.question_text, "created_at": question.created_at, "question_type": question.question_type, "difficulty": question.difficulty, "topic": question.topic, "is_active": question.is_active, "created_by": question.created_by, "level": question.level, "explanation": question.explanation} 
                      #for question in get_questions]
    return {"questions": questionList}
#get all questins by level and topic
@app.get("/questions/{level}/{topic}")
def get_questions_by_level_and_topic(level: int, topic: str):
    get_questions = db.query(Questions).filter(Questions.level == level, Questions.topic == topic).all()
    if not get_questions:
        return {"error": "No questions found for the given level and topic"}
    
    questionList = []
    for question in get_questions:
        questionitem = {
            "id": question.id,
            "question_text": question.question_text,
            "created_at": question.created_at.astimezone(ZoneInfo("UTC")).isoformat(),
            "question_type": question.question_type,
            "difficulty": question.difficulty,
            "topic": question.topic,
            "is_active": question.is_active,
            "created_by": question.created_by,
            "level": question.level,
            "explanation": question.explanation
        }
        anwers_list = []
        for answer in question.answers:
            answer_item = {
                "id": answer.id,
                "question_id": answer.question_id,
                "answer_text": answer.answer_text,
                "is_correct": answer.is_correct,
                "created_at": answer.created_at.astimezone(ZoneInfo("UTC")).isoformat(),
                "created_by": answer.created_by
            }
            anwers_list.append(answer_item)
        questionitem["answers"] = anwers_list
        
        questionList.append(questionitem)
    
    return {"questions": questionList,"uuid": str(uuid.uuid4())}  # Return a unique identifier for the request
@app.get("/questions")
    

   

@app.get("/")
def read_root():
    return {"Hello": "testig api potential"}   ,

