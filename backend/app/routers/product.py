from fastapi import APIRouter , status , Depends
from sqlalchemy.orm import Session
from ..schemas import product_schema
from ..database import get_db
from ..controller import product_controller

router = APIRouter(
    tags=['cart'],
    prefix='/cart'
)

@router.post("/" , status_code=status.HTTP_201_CREATED)
def add_product(product: product_schema.Product_Base_Model , db: Session = Depends(get_db)):
    return product_controller.add(product , db)

@router.get("/products/{email}" , status_code=status.HTTP_200_OK)
def get_all_products(email : str , db : Session = Depends(get_db)):
    return product_controller.allProducts(email , db)

@router.delete("/remove" , status_code=status.HTTP_202_ACCEPTED)
def remove_product(product: product_schema.Product_Base_Model , db: Session = Depends(get_db)):
    return product_controller.remove(product , db)

# @router.get("/get_products" , status_code=status.HTTP_200_OK)
# def get_all_products(db: Session = Depends(get_db)):
#     products = db.query(product_model.Product).all()
#     if not products:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="No product data found")
#     return products


# @router.put("update_product" , status_code=status.HTTP_200_OK)
# def update_product(product : product_schema.Product_Base_Model , db: Session = Depends(get_db)):
#     updated_product = db.query(product_model.Product).filter(product_model.Product.id == product.id and product_model.email == product.email)
#     if not updated_product.first():
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Product not found")
#     updated_product.update(product, synchronize_session=False)
#     db.commit()
#     return "Updated Successfully"
