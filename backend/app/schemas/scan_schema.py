from pydantic import BaseModel, ConfigDict
from typing import Optional, Any, List
from datetime import datetime

class ScanCreate(BaseModel):
    filename: str
    disease: Optional[str] = None
    confidence: Optional[float] = None
    severity: Optional[str] = None
    meta_data: Optional[Any] = None

class ScanOut(BaseModel):
    id: int
    filename: str
    disease: Optional[str]
    confidence: Optional[float]
    severity: Optional[str]
    meta_data: Optional[Any]
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
