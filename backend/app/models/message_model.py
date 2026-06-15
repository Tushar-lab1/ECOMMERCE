from sqlalchemy import Column , String , Integer
from ..database import Base

class Message(Base):
    __tablename__ = 'message'
    id = Column(Integer , primary_key=True , index=True , unique=True)
    name = Column(String)
    email = Column(String)
    message = Column(String)