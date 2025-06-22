
import database,models,apischema,oauth2
from fastapi import FastAPI, HTTPException,status,Response,Depends,APIRouter
from sqlalchemy.orm import Session
from datetime import datetime
from zoneinfo import ZoneInfo

db= database.get_db()
#db1= database.SessionLocal()
#print("###get db in get db.py"+str(db1))
#print("###get db in SessionLocal.py"+str(db))

postrouter = APIRouter(prefix="/posts/v1" , tags=["posts"])

@postrouter.get("/",status_code=status.HTTP_200_OK)
def get_all_posts(db: Session = Depends(database.get_db)):
   #print("###get all posts in get_all_posts")
   get_posts=db.query(models.Post).all()
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
@postrouter.get("/{id}",status_code=status.HTTP_200_OK)
def find_post(id: int, db: Session = Depends(database.get_db),user_id: int = Depends(oauth2.get_current_user)):
    get_post=db.query(models.Post).filter(models.Post.id == id).first()
    print("get post by id"+str(get_post))   
    if not get_post:
          return Response(status_code=status.HTTP_404_NOT_FOUND, content=f"Post not found with the given ID {id} ")
    # Convert the fetched data to a dictionary format
    return { "post": get_post}

########### create a new post   and insert into db ########################## user_id: int = Depends(oauth2.get_current_user)
@postrouter.post("/")
def create_posts(post: apischema.Post,db: Session = Depends(database.get_db),current_user : int = Depends(oauth2.get_current_user)):
    print("###start creating posts user id "+str(current_user.id))
    try:
        new_post = models.Post(
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
        #print("###start commiting to the database create posts"+" "+str(new_post.id))
    
        if not new_post:
          raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not added successfully")
          return {"error": "Post not added successfully"}
        #myposts = [{"id": row[0], "title": row[1], "content": row[2], "created_at": row[3]} for row in myposts]
        return {"post": new_post.id, "title": new_post.title, "content": new_post.content, "created_at": new_post.created_at.isoformat(), "published": new_post.published}
    except Exception as e:      
        return {"error": str(e)}
    
 ########### delete post by id  ##########################
@postrouter.delete("/{id}")
def delete_post(id: int, update_post: apischema.PostCreate, db: Session = Depends(database.get_db),current_user: int = Depends(oauth2.get_current_user)):
    get_post=db.query(models.Post).filter(models.Post.id == id).first()
    print("###delete post by id"+str(get_post.id)+"cur id" +str(current_user.id))
    if get_post:
        #if get_post.id != current_user.id:
            #return Response(status_code=status.HTTP_403_FORBIDDEN, content="You are not authorized to delete this post")
        db.delete(get_post)
        db.commit()
        return {"message": "Post deleted successfully", "post": get_post.id}
    else:
        return Response(status_code=status.HTTP_404_NOT_FOUND, content ="Post not found")