from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine
from .models import user_model , product_model ,message_model, item_model
from .routers import product , user , auth , message , item

app = FastAPI()
app.include_router(product.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(message.router)
app.include_router(item.router)
app.mount(
    "/static",
    StaticFiles(directory="static"),
    name = "static"
)
user_model.Base.metadata.create_all(engine)
product_model.Base.metadata.create_all(engine)
message_model.Base.metadata.create_all(engine)
item_model.Base.metadata.create_all(engine)

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