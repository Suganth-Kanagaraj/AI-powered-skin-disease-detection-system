from sqlalchemy.orm import Session
from app.models.scan import SkinScan

def create_scan(db: Session, user_id: int, filename: str, disease: str = None, confidence: float = None, severity: str = None, metadata: dict = None):
    scan = SkinScan(
        user_id=user_id,
        filename=filename,
        disease=disease,
        confidence=confidence,
        severity=severity,
        metadata=metadata,
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)
    return scan

def get_user_scans(db: Session, user_id: int, limit: int = 50):
    return db.query(SkinScan).filter(SkinScan.user_id == user_id).order_by(SkinScan.created_at.desc()).limit(limit).all()
