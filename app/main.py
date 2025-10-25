from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.db.database import Base, engine
from app.routers import auth

app = FastAPI(title="EcoOmni Onboarding API", version="0.1.0")

# CORS for demo; tighten in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router)

# Serve static frontend
app.mount("/static", StaticFiles(directory="public"), name="static")


@app.get("/")
async def root_index():
    return FileResponse("public/index.html")


@app.on_event("startup")
def on_startup():
    # Create tables on startup (demo). In production, use migrations.
    Base.metadata.create_all(bind=engine)

