from pydantic import BaseModel , EmailStr

class User_Base_Model(BaseModel):
    name: str
    email: EmailStr
    password: str