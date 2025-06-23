from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,Session
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base
import os
from dotenv import load_dotenv
from config import settings

# Replace with your actual DB URL
load_dotenv()

#api_url = os.getenv("API_URL")

#DATABASE_URL = os.getenv("DB_URL")

#DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_URL=settings.db_url
print("Connected to DB: ")

if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
#m/swamy-pega/python_api.git
engine = create_engine(DATABASE_URL)

# Session setup
SessionLocal = sessionmaker(autoflush=False,autocommit=False,bind=engine)
session = SessionLocal()

Base = declarative_base()

# Create and insert a new user
#new_user = User(name="Alice", email="alice@example.com")
#session.add(new_user)
#session.commit()

# Query users
#users = session.query(User).all()
#for user in users:
  #  print(user.id, user.name, user.email)
def get_db():
   db = SessionLocal()
   try:
      yield db
   finally:
       db.close()
# Example usage
# with get_db() as db:
