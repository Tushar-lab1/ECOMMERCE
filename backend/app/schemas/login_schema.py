from pydantic import BaseModel

class Login_Base_Model(BaseModel):
    email : str
    password: str