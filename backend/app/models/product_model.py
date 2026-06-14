from sqlalchemy import Column , Integer , String
from app.database import Base

class Product(Base):
    __tablename__ = 'product'
    
    id = Column(Integer , primary_key=True , index=True , unique=True)
    email = Column(String)
    product_id = Column(String)
    size = Column(String)
    amount = Column(Integer)