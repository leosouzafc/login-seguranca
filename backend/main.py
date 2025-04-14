from fastapi import FastAPI,HTTPException
from backend.routers.auth import router as auth_router
from backend.routers.users import router as user_router

app = FastAPI()

def include_routers():
    app.include_router(auth_router, prefix="/auth", tags=["auth"])
    app.include_router(user_router, prefix="/users", tags=["users"])



include_routers()

@app.get("/ping")
def health_check():
    # raise HTTPException(status_code=500, detail="Erro forçado")
    return {"message":"pong"}