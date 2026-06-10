from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.scan import SkinScan
from app.models.report import MedicalReport

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get('/stats')
def stats(db: Session = Depends(get_db), user = Depends(get_current_user)):
    total_scans = db.query(SkinScan).filter(SkinScan.user_id == user.id).count()
    total_reports = db.query(MedicalReport).filter(MedicalReport.user_id == user.id).count()
    recent_scans = db.query(SkinScan).filter(SkinScan.user_id == user.id).order_by(SkinScan.created_at.desc()).limit(5).all()
    # disease distribution simple aggregation
    dist = db.query(SkinScan.disease, func.count(SkinScan.id)).filter(SkinScan.user_id == user.id).group_by(SkinScan.disease).all()
    return {
        'total_scans': total_scans,
        'total_reports': total_reports,
        'recent_scans': recent_scans,
        'disease_distribution': dist,
    }
