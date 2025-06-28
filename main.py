#install fastapi
from fastapi import FastAPI, HTTPException,status,Response,Depends
from fastapi.middleware.cors import CORSMiddleware
#install uvicorn
from fastapi import Body
from pydantic import BaseModel
from random import randrange
from datetime import datetime
from zoneinfo  import ZoneInfo
#install psycopg
#import psycopg
#import time
#get database connection
from database import Base, engine,session,Session,get_db

#get table model from model
from models import Base,Post,Questions,Answers
# Uncomment the following line if you want to use psycopg2 instead of psycopg8888
#install pydantic
#rom pydantic import model_dump
#install pydantic
from typing import Optional

from routers.posts import postrouter
from routers.getquestions import questionsrouter
from routers.users import userrouter  
from routers.auth import authrouter     
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
#from config import settings
from fastapi.staticfiles import StaticFiles
#from flask import Flask, jsonify,redirect    

Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000",  "http://localhost:8000",
    "http://www.swamy-p.xyz","https://pythonproj-swamy-6ac538a29b8b.herokuapp.com"

]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],              # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],              # Allows all headers
)



#print("ssetting..." + str(settings.db_host) + " " + str(settings.db_port) + " " + str(settings.db_user) + " " + str(settings.db_password) + " " + str(settings.db_name))
#get db for sqlalchemy
db = session
print("Database connection established successfully"+" "+str(db))

app.include_router(postrouter)
app.include_router(questionsrouter)
app.include_router(userrouter)
app.include_router(authrouter)


# Serve React static files
#app.mount("/quiz-app", StaticFiles(directory="./myquiz-app/dist", html=True), name="quiz-app")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}



@app.get("/api/hello")
def hello():
    return {"message": "Hello from FastAPI! 66"}



