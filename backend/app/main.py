from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from .models import user_model , product_model
from .routers import product , user , auth

app = FastAPI()
app.include_router(product.router)
app.include_router(user.router)
app.include_router(auth.router)

user_model.Base.metadata.create_all(engine)
product_model.Base.metadata.create_all(engine)

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

@app.get("/")
def test():
    return {"message" : "backend is running"}