from pydantic import BaseModel
from typing import Optional, List, Any

class ReportCreate(BaseModel):
    scan_id: Optional[int]
    disease: Optional[str]
    confidence: Optional[float]
    severity: Optional[str]
    symptoms: Optional[List[str]]
    recommendations: Optional[List[str]]
    medicines: Optional[List[str]]


class ReportOut(BaseModel):
    id: int
    user_id: int
    scan_id: Optional[int]
    disease: Optional[str]
    confidence: Optional[float]
    severity: Optional[str]
    symptoms: Optional[Any]
    recommendations: Optional[Any]
    medicines: Optional[Any]
    created_at: str

    class Config:
        orm_mode = True
