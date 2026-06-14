from fastapi import APIRouter , status , HTTPException , Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import user_model
from ..middleware import hashing , token
from ..schemas import login_schema
router = APIRouter(
    tags=['auth'],
)


@router.post("/signin" , status_code=status.HTTP_200_OK)
def signin(user : login_schema.Login_Base_Model , db :Session = Depends(get_db)):
    get_user = db.query(user_model.User).filter(user.email == user_model.User.email).first()
    print("stored type:", type(get_user.password))
    if not get_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Invalid Credentials")
    if not hashing.verify_password(user.password , get_user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Invalid Credentials")
    
    access_token = token.create_access_token(data={'sub' : user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }