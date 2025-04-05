from fastapi import FastAPI
from app.routers.auth import router as auth_router
from app.routers.users import router as user_router

app = FastAPI()

def include_routers():
    app.include_router(auth_router, prefix="/auth", tags=["auth"])
    app.include_router(user_router, prefix="/users", tags=["users"])

include_routers()

@app.get("/")
def read_root():
    return {"message": "A api está online"}
