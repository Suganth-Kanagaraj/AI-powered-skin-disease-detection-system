from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user, require_admin
from app.schemas.report_schema import ReportCreate, ReportOut
from app.services.report_service import create_report, get_reports_for_user
from app.utils.pdf_generator import generate_simple_report

from io import BytesIO

router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.post('/', response_model=ReportOut)
def generate_report(payload: ReportCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    r = create_report(db, user.id, payload.dict())
    return r


@router.get('/', response_model=list[ReportOut])
def list_reports(db: Session = Depends(get_db), user = Depends(get_current_user)):
    return get_reports_for_user(db, user.id)


@router.get('/{report_id}/download')
def download_report(report_id: int, db: Session = Depends(get_db), user = Depends(get_current_user)):
    # fetch report
    from app.models.report import MedicalReport
    rpt = db.query(MedicalReport).filter(MedicalReport.id == report_id).first()
    if not rpt:
        raise HTTPException(status_code=404, detail='Report not found')
    # permission: owner or admin
    if rpt.user_id != user.id and not getattr(user, 'is_admin', False) and getattr(user, 'role', '') != 'admin':
        raise HTTPException(status_code=403, detail='Not authorized to access this report')

    # build dict for PDF
    report_dict = {
        'Patient Name': getattr(rpt.user, 'name', None) or '',
        'Email': getattr(rpt.user, 'email', ''),
        'Date': str(rpt.created_at),
        'Disease': rpt.disease,
        'Confidence': rpt.confidence,
        'Severity': rpt.severity,
        'Symptoms': rpt.symptoms,
        'Recommendations': rpt.recommendations,
    }

    pdf_bytes = generate_simple_report(report_dict)
    buf = BytesIO(pdf_bytes)
    buf.seek(0)
    headers = {"Content-Disposition": f"attachment; filename=report_{report_id}.pdf"}
    return StreamingResponse(buf, media_type='application/pdf', headers=headers)
