from fastapi import APIRouter , status , HTTPException , Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import user_model
from ..middleware import hashing , token

router = APIRouter(
    tags=['auth'],
    prefix="/auth"
)


@router.post("signin" , status_code=status.HTTP_200_OK)
def signin(user , db :Session = Depends(get_db)):
    get_user = db.query(user_model.User).filter(user.email == user_model.User.email).first()
    if not get_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="User not found")
    if not hashing.verify_password(user.password , get_user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Incorrect Password")
    
    access_token = token.create_access_token(data={'sub' : user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }