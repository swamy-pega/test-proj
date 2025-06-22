from pydantic import BaseModel  
from typing import Optional, List, Dict, Any, Union
from datetime import datetime
from pydantic import Field, model_validator,EmailStr
from pydantic import ConfigDict
class Post(BaseModel):
    #id: int
    title: str
    content: str
    published: bool = True
    rating:Optional[int] = None

class answers(BaseModel):
    #id: int
    #question_id: int  # Foreign key to Questions table
     answer_text: str
     is_correct: bool = False  # Indicates if the answer is correct
     created_at: datetime = Field(default_factory=datetime.now)
     created_by: Optional[str] = None  # User who created the answ

class questions(BaseModel):
    #id: int    
    question_text: str
    created_at: datetime = Field(default_factory=datetime.now)
    question_type: str  # e.g., 'single_choice', 'multiple_choice', etc.
    difficulty: str  # e.g., 'easy', 'medium', 'hard'
    topic: str  # e.g., 'math', 'science', etc.
    is_active: bool = True  # Indicates if the question is active
    created_by: str  # User who created the question
    level: int  # Difficulty level of the question
    explanation: Optional[str] = None  # Explanation for the question, if any
    answers: List[answers]  
    
    


class Config:
        from_attributes = True 

class questionList(BaseModel):
    question_list: List[questions]

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None
    #is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

class UserResponse(BaseModel):
    email: EmailStr
    id:int
    #is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now)
    #updated_at: Optional[datetime] = None

class UserUpdate(BaseModel):
    email: EmailStr
    #is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None 

class UserOutput(BaseModel):
    id: int
    email: str
    name: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now)
    #updated_at: Optional[datetime] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class PostBase(BaseModel):
   
    title: str
    content: str
    created_at: datetime = Field(default_factory=datetime.now)
    published: bool = True
   
class PostCreate(PostBase):
      pass      

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[int] = None
    email: Optional[str] = None
    name: Optional[str] = None



    