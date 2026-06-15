from sqlalchemy.orm import Session
from ..schemas import message_schema
from ..models import message_model

def message(message:message_schema.Message_Base_Model , db : Session):
    new_message = message_model.Message(name = message.name ,email = message.email , message = message.message)
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return {"Message" : "Message Submitted"}