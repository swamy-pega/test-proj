from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

# Replace with your actual DB URL
DATABASE_URL = "postgresql://postgres:password@localhost:5432/postgres"
print("Connecting to the database...")
#test apai
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
