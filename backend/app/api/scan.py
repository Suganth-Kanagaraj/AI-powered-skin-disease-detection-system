from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import os
from uuid import uuid4

from app.core.database import get_db
from app.core.security import get_current_user
from app.services.scan_service import create_scan, get_user_scans
from app.ai.preprocess import preprocess_image
from app.ai.predictor import predict

router = APIRouter(prefix="/api/scan", tags=["scan"])

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post('/upload')
async def upload_scan(file: UploadFile = File(...), db: Session = Depends(get_db), user = Depends(get_current_user)):
    try:
        ext = os.path.splitext(file.filename)[1]
        fname = f"{uuid4().hex}{ext}"
        dest = os.path.join(UPLOAD_DIR, fname)
        with open(dest, 'wb') as f:
            content = await file.read()
            f.write(content)

        # preprocess
        img_arr = preprocess_image(dest)
        # predict
        result = predict(img_arr)

        # persist
        scan = create_scan(db=db, user_id=user.id, filename=fname, disease=result.get('disease'), confidence=result.get('confidence'), severity=result.get('severity'), metadata=result)

        return JSONResponse({
            'id': scan.id,
            'disease': result.get('disease'),
            'confidence': result.get('confidence'),
            'severity': result.get('severity'),
            'recommendations': result.get('recommendations')
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/history')
def history(db: Session = Depends(get_db), user = Depends(get_current_user)):
    scans = get_user_scans(db, user.id)
    return scans
