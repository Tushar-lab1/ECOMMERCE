from pydantic import BaseModel , EmailStr

class Product_Base_Model(BaseModel):
    email: EmailStr
    product_id: str
    size: str
    amount: int