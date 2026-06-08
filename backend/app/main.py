from fastapi import FastAPI , Depends , HTTPException , status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
# from app.routers.auth import router as auth_router
from .schemas.user_schema import User_Base_Model
from .database import engine , SessionLocal
from .models import user_model
app = FastAPI()
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

user_model.Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# app.include_router(
#     auth_router,
#     prefix="/auth",
#     tags=["Authentiction"]
# )

@app.get("/")
def test():
    return {"message" : "backend is running"}

@app.post("/create_user" , status_code=status.HTTP_201_CREATED)
def create_user(user : User_Base_Model , db : Session = Depends(get_db)):
    new_user = user_model.User(name = user.name , email = user.email , password = user.password)
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"id": new_user.id, "name": new_user.name, "email": new_user.email}
    except IntegrityError:
        # Catches duplicate emails if your DB column has unique=True
        db.rollback() 
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email already registered"
        )

@app.get("/all_users" , status_code=status.HTTP_200_OK)
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(user_model.User).all()
    return users

@app.delete("/user/{email}" , status_code=status.HTTP_202_ACCEPTED)
def delete_user(email , db : Session = Depends(get_db)):
    deleted_user = db.query(user_model.User).filter(user_model.User.email == email).delete(synchronize_session=False)
    if deleted_user == 0:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND , detail={"User not found"})
    db.commit()
    return {"Response"  : "done"}

@app.get("/user/info/{email}" , status_code=status.HTTP_202_ACCEPTED)
def get_user(email , db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT , detail="User not found")
    return {"id": user.id, "name": user.name, "email": user.email}
    