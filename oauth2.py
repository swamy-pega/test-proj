from jose import jwt
from jose.exceptions import JWTError,ExpiredSignatureError

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta,timezone
from typing import Optional
import apischema,database,models
from fastapi.security import OAuth2PasswordBearer

from config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# OAuth2 configuration for JWT token creation and validation    

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

def create_access_token(data: dict, expires_delta: int = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow()+ timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    #print("###create_access_token to_encode "+str(to_encode))
    #print("###create_access_token expire "+str(expire))
    #print("###create_access_token SECRET_KEY "+str(SECRET_KEY))
    #print("###create_access_token ALGORITHM "+str(ALGORITHM))
    #print("###create_access_token expires_delta "+str(expires_delta))
    #print("###create_access_token data "+str(data))
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
#credentials_exception)

def verify_token(token: str):
    try:
        #print("###verify_token payload$$$$$---"+str(SECRET_KEY)+"---alg---"+str(ALGORITHM))
        #print("###verify_token token##### "+str(token))
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("###verify_token payload "+str(payload))
        id: int = payload.get("sub")
        if id is None:
            raise credentials_exception
        return apischema.TokenData(id=id)
    except ExpiredSignatureError:
      print("Token expired")
     
    except JWTError as e:
        print("###verify_token JWTError---- "+str(e))
        
def verify_access_token(token: str,credentials_exception):

    try:
        #print("###verify_access_token payload---"+str(SECRET_KEY)+"---alg---"+str(ALGORITHM))
        #print("###verify_access_token token "+str(token))
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("###verify_access_token payload "+str(payload))
        id: int = payload.get("sub")
        if id is None:
            raise credentials_exception
        return apischema.TokenData(id=id)
    except ExpiredSignatureError:
      print("Token expired")
      raise credentials_exception
    except JWTError as e:
        print("###verify_access_token JWTError "+str(e))
        raise credentials_exception
    #except invalid_claims:
        print("###verify_access_token InvalidAudienceError "+str(invalid_claims)+" type ")
        raise credentials_exception

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):

    credentials_exception: HTTPException = HTTPException( status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"}) 
    token=verify_access_token(token, credentials_exception)     
    try:
       user= db.query(models.User).filter(models.User.id == token.id).first()

       #print("###get_current_user token id "+str(token.id))
       if not user:
           raise credentials_exception   
       return user
    except JWTError as e:
        #print("###get_current_user JWTError "+str(e))
        raise credentials_exception
# This function retrieves the current user from the token.
    # try:
    #print("###get_current_user payload---"+str(token)+"---alg---"+str(ALGORITHM))
    #payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    #id: int = payload.get("sub")
    #print("###get_current_user_from_token user_id"+str(id))
     #if id is None:

     #   raise credentials_exception
     #return verify_access_token(token, credentials_exception)
     #except JWTError:
      #  raise credentials_exception


def get_current_user_from_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_id: int = payload.get("sub")
       
        if user_id is None:
            raise credentials_exception
        return user_id
    except JWTError:
        raise credentials_exception
    


