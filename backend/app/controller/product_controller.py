from fastapi import HTTPException , status , Depends
from sqlalchemy.orm import Session
from ..models import product_model
from ..schemas import product_schema
from ..middleware.token import get_current_user

def add(product : product_schema.Product_Base_Model , db : Session ,current_user = Depends(get_current_user)):
    new_product = product_model.Product(email = product.email ,product_id = product.product_id ,size = product.size ,amount =  product.amount)
    if new_product: 
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return {"id" : product.product_id , "size" : product.size , "amount" : product.amount }
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail="Can't add the product")
    
def allProducts(email : str ,db : Session,current_user = Depends(get_current_user)):
    products = db.query(product_model.Product).filter(product_model.Product.email == email).all()
    if not products: 
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT , detail="No content found")
    return products  

def remove(product : product_schema.Product_Base_Model ,db : Session,current_user = Depends(get_current_user)):
    deleted_product = db.query(product_model.Product).filter(product_model.Product.product_id == product.product_id , product_model.Product.email == product.email).delete()
    print(product_model.Product.product_id)
    print(product.product_id)
    if deleted_product == 0:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND , detail="Product not found")
    db.commit()
    return "Product succesfully deleted"