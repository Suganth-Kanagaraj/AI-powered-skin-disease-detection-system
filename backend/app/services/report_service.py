from sqlalchemy.orm import Session
from app.models.report import MedicalReport

def create_report(db: Session, user_id: int, report_in: dict):
    r = MedicalReport(
        user_id=user_id,
        scan_id=report_in.get('scan_id'),
        disease=report_in.get('disease'),
        confidence=report_in.get('confidence'),
        severity=report_in.get('severity'),
        symptoms=report_in.get('symptoms'),
        recommendations=report_in.get('recommendations'),
        medicines=report_in.get('medicines')
    )
    db.add(r)
    db.commit()
    db.refresh(r)
    return r

def get_reports_for_user(db: Session, user_id: int, limit: int = 100):
    return db.query(MedicalReport).filter(MedicalReport.user_id == user_id).order_by(MedicalReport.created_at.desc()).limit(limit).all()

def get_all_reports(db: Session, limit: int = 500):
    return db.query(MedicalReport).order_by(MedicalReport.created_at.desc()).limit(limit).all()
