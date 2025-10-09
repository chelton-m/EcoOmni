from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

from app.db.database import Base, engine
from app.services.mapping import create_mapping_from_file

app = FastAPI(title="EcoOmni Onboarding API", version="0.1.0")

# CORS for demo; tighten in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static frontend
app.mount("/static", StaticFiles(directory="public"), name="static")


@app.get("/")
async def root_index():
    return FileResponse("public/index.html")


@app.on_event("startup")
def on_startup():
    # Create tables on startup (demo). In production, use migrations.
    Base.metadata.create_all(bind=engine)


@app.post("/onboarding/analyze-file/")
async def analyze_file(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    try:
        result = await create_mapping_from_file(file)
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {exc}")

    return JSONResponse(content=result)

