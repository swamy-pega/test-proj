import database,models,apischema
from fastapi import FastAPI, HTTPException,status,Response,Depends,APIRouter
from sqlalchemy.orm import Session
from datetime import datetime
from zoneinfo import ZoneInfo
import uuid
db= database.get_db()

questionsrouter = APIRouter(prefix="/questions/v1" , tags=["quiz_questions"])

######### add answrs post by id  ##########################
def add_answers(answers: apischema.answers, id: int):  
    #print("add answers to the database"+"11")
    if not answers:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, content="No answers provided")
    # Assuming 'answer' is a list of Answers objects
    try:
          for answer in answers:
           #print("############each answers add question to the database"+" "+str(answer))
           new_answer = models.Answers(
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
def add_question(question: apischema.questions): 
    try:
        #print("@@@@@@@@@@@@@@@add_question call"+question.question_text)
        new_question = models.Questions(
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
        print("##########else new question"+" "+str(new_question.id))
        if not new_question:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, content="Question not added successfully")
        else:
            #print("##########else new question"+" "+str(new_question.id))
            add_answers(question.answers, new_question.id)  # Assuming each question has a list of answers
        
    except Exception as e:
        return {"error": str(e)}

@questionsrouter.post("/add")
def add_questions(questions: apischema.questionList,db: Session = Depends(database.get_db)):
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

@questionsrouter.get("/answers/{id}")

def get_anwsers(id: int,db: Session = Depends(database.get_db)):
    get_anwsers=db.query(models.Answers).filter(models.Answers.question_id == id).all()
    #print("get post by id"+str(get_anwsers))   
    if not get_anwsers:
          return Response(status_code=status.HTTP_404_NOT_FOUND, content=f"answers not found with the given ID {id} ")
    # Convert the fetched data to a dictionary format
    return { "anwers": get_anwsers}
@questionsrouter.get("/")
def get_all_questions(db: Session = Depends(database.get_db)):
    get_questions = db.query(models.Questions).all()
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
@questionsrouter.get("/{level}/{topic}")
def get_questions_by_level_and_topic(level: int, topic: str,db: Session = Depends(database.get_db)):
    get_questions = db.query(models.Questions).filter(models.Questions.level == level, models.Questions.topic == topic).all()
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
