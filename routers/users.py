import database,models,apischema
from fastapi import FastAPI, HTTPException,status,Response,Depends,APIRouter
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from utils import hash_password, verify_password

#create a user router
userrouter = APIRouter(prefix="/users/v1" , tags=["users"])
@userrouter.post("/", status_code=status.HTTP_201_CREATED, response_model=apischema.UserResponse)
def create_user(user: apischema.UserCreate, db: Session = Depends(database.get_db)):
    # Check if the user already exists


    user.password = hash_password(user.password)
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    # Create a new user instance
    new_user = models.User(
        email=user.email,
        password=user.password,  # In a real application, hash the password
        name=user.name
    )
    
    # Add the new user to the database session
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    # Return the created user
    return new_user
@userrouter.get("/{user_id}", status_code=status.HTTP_200_OK, response_model=apischema.UserOutput)
def get_user(user_id: int, db: Session = Depends(database.get_db)):
    # Fetch the user by ID
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    # Return the user details
    return user
@userrouter.get("/", response_model=list[apischema.UserResponse])
def get_all_users(db: Session = Depends(database.get_db)):
    # Fetch all users
    users = db.query(models.User).all()
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No users found")
    
    # Return the list of users
    return users
@userrouter.put("/{user_id}", response_model=apischema.UserResponse)
def update_user(user_id: int, user: apischema.UserUpdate, db: Session = Depends(database.get_db)):  
    # Fetch the user by ID
    existing_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    # Update the user details
    for key, value in user.dict(exclude_unset=True).items():
        setattr(existing_user, key, value)
    
    # Commit the changes to the database
    db.commit()
    db.refresh(existing_user)
    
    # Return the updated user
    return existing_user
@userrouter.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(database.get_db)):
    # Fetch the user by ID
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    # Delete the user from the database
    db.delete(user)
    db.commit()
    
    # Return a success response
    return Response(status_code=status.HTTP_204_NO_CONTENT)
# Note: Ensure that the models and apischema modules are correctly defined with the User model and schemas.
# The User model should have fields like id, email, password, and full_name.
# The apischema module should define UserCreate, UserResponse, and UserUpdate schemas.
# Ensure that the database session is correctly set up in the database module.
# This code provides a basic user management API with CRUD operations.