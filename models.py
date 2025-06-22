from sqlalchemy import Column, Integer, String,DateTime,func,Boolean,ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import text
# models.py
# from sqlalchemy.ext.declarative import declarative_base
#from sqlalchemy.orm import declarative_base

from database import Base


class Post(Base):
    __tablename__ = 'posts'
    __table_args__ = {'schema': 'fastapi'}  # Specify the schema if needed

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime (timezone=True), nullable=False, server_default=func.now())  # Use String for datetime if not using DateTime type
    published = Column(Boolean, server_default='True')  # Use String for boolean if not using Boolean type

    class Config:
        orm_mode = True  # Enable ORM mode for Pydantic compatibility
# This allows the model to be used with Pydantic for serialization/deserialization
# and validation.
class Questions(Base):
     __tablename__ = 'questions'
     __table_args__ = {'schema': 'fastapi'}  # Specify the schema if needed
     id = Column(Integer, primary_key=True)
     question_text = Column(String, nullable=False)
     created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
     question_type = Column(String, nullable=False)  # e.g., 'single_choice', 'multiple_choice', etc.
     difficulty = Column(String, nullable=False)  # e.g., 'easy', 'medium', 'hard'
     topic = Column(String, nullable=False)  # e.g., 'math', 'science', etc.
     is_active = Column(Boolean, server_default='True')  # Indicates if the question is active
     created_by = Column(String, nullable='True')  # User who created the question
     level = Column(Integer, nullable=False)  # Difficulty level of the question
     explanation = Column(String, nullable=True)  # Comma-separated tags for the question
     #answers = relationship("Answers", back_populates="questions")
     answers = relationship("Answers", back_populates="question", cascade="all, delete-orphan")

     class Config:  
      from_attributes = True

# anwers table model
class Answers(Base):
    __tablename__ = 'answers'
    __table_args__ = {'schema': 'fastapi'}  # Specify the schema if needed
    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey("fastapi.questions.id"), nullable=False) # Foreign key to Questions table
    answer_text = Column(String, nullable=False)
    is_correct = Column(Boolean, server_default='False')  # Indicates if the answer is correct
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    created_by = Column(String, nullable=True)  # User who created the answer
    question = relationship("Questions", back_populates="answers")
    class Config:
        orm_mode = True  # Enable ORM mode for Pydantic compatibility 
# This allows the model to be used with Pydantic for serialization/deserialization      
class User(Base):
    __tablename__ = 'users'
    __table_args__ = {'schema': 'fastapi'}  # Specify the schema if needed

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)

    class Config:
        orm_mode = True  # Enable ORM mode for Pydantic compatibility