from pydantic import BaseModel  
from typing import Optional, List, Dict, Any, Union
from datetime import datetime
from pydantic import Field, model_validator
from pydantic import ConfigDict
class post(BaseModel):
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



    