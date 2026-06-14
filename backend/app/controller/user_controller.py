from fastapi import status , HTTPException
from sqlalchemy.orm import Session
from ..models import user_model
from sqlalchemy.exc import IntegrityError
from ..schemas import user_schema
from ..middleware import hashing

def create(user: user_schema.User_Base_Model , db: Session):
    hashed_password = hashing.get_password_hash(user.password)
    new_user = user_model.User(name = user.name , email = user.email , password = hashed_password)
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"name": new_user.name, "email": new_user.email}
    except IntegrityError:
        # Catches duplicate emails if your DB column has unique=True
        db.rollback() 
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email already registered"
        )
    