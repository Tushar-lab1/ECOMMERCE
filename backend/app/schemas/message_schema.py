from pydantic import BaseModel , EmailStr

class Message_Base_Model(BaseModel):
    name: str
    email: EmailStr
    message: str