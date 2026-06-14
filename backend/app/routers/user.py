from fastapi import APIRouter , status , HTTPException , Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from ..schemas import user_schema
from ..models import user_model
from ..database import get_db
from ..controller import user_controller
router = APIRouter(
    tags=['user'],
    prefix='/user'
)

@router.post("/" , status_code=status.HTTP_201_CREATED)
def create_user(user : user_schema.User_Base_Model , db : Session = Depends(get_db)):
    return user_controller.create(user , db)

@router.delete("/{email}" , status_code=status.HTTP_202_ACCEPTED)
def delete_user(email , db : Session = Depends(get_db)):
    deleted_user = db.query(user_model.User).filter(user_model.User.email == email).delete(synchronize_session=False)
    if deleted_user == 0:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND , detail={"User not found"})
    db.commit()
    return {"Response"  : "done"}

@router.get("/{email}" , status_code=status.HTTP_202_ACCEPTED)
def get_user(email , db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT , detail="User not found")
    return {"id": user.id, "name": user.name, "email": user.email}
