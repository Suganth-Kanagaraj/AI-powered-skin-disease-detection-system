from pydantic import BaseModel
from typing import Optional, Any

class ScanCreate(BaseModel):
    filename: str
    disease: Optional[str]
    confidence: Optional[float]
    severity: Optional[str]
    metadata: Optional[Any]

class ScanOut(BaseModel):
    id: int
    filename: str
    disease: Optional[str]
    confidence: Optional[float]
    severity: Optional[str]
    metadata: Optional[Any]

    class Config:
        orm_mode = True
