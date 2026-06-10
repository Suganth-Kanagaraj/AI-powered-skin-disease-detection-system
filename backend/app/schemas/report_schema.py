from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Any
from datetime import datetime

class ReportCreate(BaseModel):
    scan_id: Optional[int] = None
    disease: Optional[str] = None
    confidence: Optional[float] = None
    severity: Optional[str] = None
    symptoms: Optional[List[str]] = None
    recommendations: Optional[List[str]] = None
    medicines: Optional[List[str]] = None


class ReportOut(BaseModel):
    id: int
    user_id: int
    scan_id: Optional[int] = None
    disease: Optional[str] = None
    confidence: Optional[float] = None
    severity: Optional[str] = None
    symptoms: Optional[Any] = None
    recommendations: Optional[Any] = None
    medicines: Optional[Any] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
