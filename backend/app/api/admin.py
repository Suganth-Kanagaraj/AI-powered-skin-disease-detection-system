from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.core.security import require_admin
from app.services.report_service import get_all_reports
from app.models.scan import SkinScan

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.get('/analytics')
def analytics(db: Session = Depends(get_db), _ = Depends(require_admin)):
    total_scans = db.query(SkinScan).count()
    total_reports = len(get_all_reports(db, limit=1000))
    # sample disease counts
    disease_counts = db.query(SkinScan.disease, func.count(SkinScan.id)).group_by(SkinScan.disease).all()
    return {
        'total_scans': total_scans,
        'total_reports': total_reports,
        'disease_counts': disease_counts
    }
