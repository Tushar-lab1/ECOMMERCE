from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import message_schema
from ..controller import message_controller
router = APIRouter(
    tags=['message'],
    prefix="/message"
)

@router.post("/")
def post_message(request: message_schema.Message_Base_Model , db : Session = Depends(get_db)):
    return message_controller.message(request , db)