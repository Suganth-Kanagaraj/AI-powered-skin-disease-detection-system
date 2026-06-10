from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base

from app.api import auth as auth_router
from app.api import scan as scan_router
from app.api import reports as reports_router
from app.api import admin as admin_router
from app.api import dashboard as dashboard_router

app = FastAPI(title="AI Skin Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    # create tables (in production use migrations)
    Base.metadata.create_all(bind=engine)


@app.get("/api/health")
async def health():
    return {"status":"ok"}


# include routers
app.include_router(auth_router.router)
app.include_router(scan_router.router)
app.include_router(reports_router.router)
app.include_router(admin_router.router)
app.include_router(dashboard_router.router)

