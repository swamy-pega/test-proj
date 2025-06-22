

print("###start add function in add.py")
import database,models,apischema
from fastapi import FastAPI, HTTPException,status,Response,Depends,APIRouter
from sqlalchemy.orm import Session
from datetime import datetime
from zoneinfo import ZoneInfo


def add(a, b):
    return a + b
finalresult = 8
