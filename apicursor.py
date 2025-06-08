#install fastapi
from fastapi import FastAPI, HTTPException,status,Response
#install uvicorn
from fastapi import Body
from pydantic import BaseModel
import psycopg
from typing import Optional
from random import randrange
from datetime import datetime
from zoneinfo  import ZoneInfo
app = FastAPI()
while True:
    try:
        conn = psycopg.connect(
            host="localhost",
            dbname="postgres",
            port=5432,
            user="postgres",
            password="password")
        print("Connected to the database successfully  testing")
        break
    except Exception as e:
        print("Failed to connect to the database, retrying in 2 seconds...")
        print(e)
        #time.sleep(2)
    
# Uncomment the following lines if you want to use psycopg2 instead of psycopg
# If you want to use psycopg2 instead of psycopg, uncomment the following lin
#    if conn:
#        conn.close()
#        print("Database connection closed.")
# Define a Pydantic model for the post
class post(BaseModel):
    #id: int
    title: str
    content: str
    published: bool = True
    rating:Optional[int] = None

myposts = [
    {'id':'1', 'title': 'title of post 1', 'user': 'user1', 'published': True, 'rating': 5},
    {'id':'2', 'title': 'title of post 2', 'user': 'user2', 'published': False, 'rating': 3},
    {'id': '3', 'title': 'title of post 3', 'user': 'user3',  'published': False, 'rating': 4}  ]

def get_posts():
   get_posts = conn.cursor()
   get_posts.execute("SELECT id, title, content, created_at FROM fastapi.posts;")
   myposts = get_posts.fetchall()
   get_posts.close()
   if not myposts:
       return {"error": "No posts found"}           
   return {"data": myposts}

@app.delete("/posts/{id}")
def delete_post(id: int):
    cursor = conn.cursor()
    cursor.execute("DELETE FROM fastapi.posts WHERE id = %s RETURNING *;", (str(id),))
    deleted_post = cursor.fetchone()
    cursor.close()
    if not deleted_post:
        #raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found ")
       return Response(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found  ")
    conn.commit()
    return {"message": "Post deleted successfully", "post": deleted_post}

def find_post(id):
    details = conn.cursor()
    details.execute("SELECT id, title, content, created_at FROM fastapi.posts WHERE id = %s;", (id,))
    myposts = details.fetchall()
    details.close()
    if not myposts:
        return None
    # Convert the fetched data to a dictionary format
    myposts = [{"id": row[0], "title": row[1], "content": row[2], "created_at": row[3]} for row in myposts]
    # for p in myposts:
     #    if p["id"] == id:
      #       return p
    return myposts
@app.post("/posts")
def create_posts(post: post):
    try: 
         cursor = conn.cursor()
         now = datetime.now(ZoneInfo("UTC"))
         print(f"Current time in UTC: {now}")
         cursor.execute("INSERT INTO fastapi.posts (title, content, created_at) VALUES (%s, %s, %s) RETURNING * ",
                   (post.title,post.content,now))
         new_post = cursor.fetchone()
         cursor.close()
         print("start commiting to the database create posts"+" "+str(new_post))
        
         conn.commit()
         print("close commiting")
         #new_post.close()
         #conn.close()
         #cursor = conn.cursor()
         #cursor.execute("SELECT id, title, content, created_at FROM fastapi.posts WHERE id = %s", (post.id,))
         #myposts = cursor.fetchall()
         #cursor.close()
         if not new_post:
          raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not added successfully")
          return {"error": "Post not added successfully"}
        #myposts = [{"id": row[0], "title": row[1], "content": row[2], "created_at": row[3]} for row in myposts]
         return {"post": new_post}
         #new_post.close()
         #conn.close()
    except Exception as e:      
        return {"error": str(e)}
    
     # cursor = conn.cursor()
     # Convert the Pydantic model to a dictionary and add a random ID
     #post_dict = post.model_dump()
     # post_dict['id'] = randrange(0, 1000000)
     #myposts.append(post_dict)
     #print(post.model_dump())
     #print(myposts)
     #return {"datat": post.model_dump()}

@app.get("/posts/{id}")

def get_posts():
   get_posts = conn.cursor()
   get_posts.execute("SELECT id, title, content, created_at FROM fastapi.posts;")
   myposts = get_posts.fetchall()
   get_posts.close()
   if not myposts:
       return {"error": "No posts found"}           
   return {"data": myposts}

@app.put("/posts/{id}")
def update_post(id: int, post: post):
    cursor = conn.cursor()
    cursor.execute("UPDATE fastapi.posts SET title = %s, content = %s, published = %s, rating = %s WHERE id = %s RETURNING *;",
                   (post.title, post.content, post.published, post.rating, id))
    updated_post = cursor.fetchone()
    cursor.close()
    if not updated_post:
        return {"error": "Post not found"}
    conn.commit()
    return {"message": "Post updated successfully", "post": updated_post}
@app.get("/posts/latest")
def get_latest_posts():
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, content, created_at FROM fastapi.posts ORDER BY created_at DESC LIMIT 5;")
    latest_posts = cursor.fetchall()
    cursor.close()
    if not latest_posts:
        return {"error": "No posts found"}
    return {"latest_posts": latest_posts}
