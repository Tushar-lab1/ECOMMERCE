from sqlalchemy import Column , String , Integer , JSON , BigInteger , Boolean , Text
from ..database import Base

class Item(Base):
    __tablename__ = "items"
    id=Column(Integer, primary_key=True)
    name=Column(String)
    description=Column(Text)
    price=Column(Integer)
    category=Column(String)
    sub_category=Column(String)
    sizes=Column(JSON)
    images=Column(JSON)
    bestseller=Column(Boolean)
    created_at=Column(BigInteger)