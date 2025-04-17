from fastapi import FastAPI,HTTPException
from backend.routers.auth import router as auth_router
from backend.routers.users import router as user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

def include_routers():
    app.include_router(auth_router, prefix="/auth", tags=["auth"])
    app.include_router(user_router, prefix="/users", tags=["users"])

include_routers()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def health_check():
    return {"message":"pong"}