from fastapi import APIRouter, Depends, HTTPException, status   

from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from utils import hash_password, verify_password   
import oauth2 
#from routers.database import get_db
import database,apischema,models
authrouter = APIRouter(tags=["auth"])
@authrouter.post("/login", status_code=status.HTTP_200_OK,response_model=apischema.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):    
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = oauth2.create_access_token(data={"sub": str(user.id)})
    #print("###access_token ###### "+str(access_token))

    verify_access_token = oauth2.verify_access_token(access_token, HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    ))  
    #print("###verify_access_token "+str(verify_access_token))
    return {"access_token": access_token, "token_type": "bearer"}          

@authrouter.post("/login/test", status_code=status.HTTP_200_OK)
def login_test(user_credentials: apischema.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password( user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = oauth2.create_access_token(data={"sub": str(user.id)})

    #verify_access_token = oauth2.verify_token(access_token)

    verify_access_token = oauth2.verify_access_token(access_token, HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}))
    
    return {" access_token":  access_token ,"verify token" : verify_access_token ,"token_type": "bearer"}
