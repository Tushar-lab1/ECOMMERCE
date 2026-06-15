from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session
from ..models.item_model import Item
from ..database import get_db

router = APIRouter()
@router.get("/items")
def get_products(db:Session=Depends(get_db)):
    return (db.query(Item).all()
)