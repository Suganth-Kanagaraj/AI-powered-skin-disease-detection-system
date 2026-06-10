from io import BytesIO
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.pdfgen import canvas
except Exception:
    reportlab = None

def generate_simple_report(report: dict) -> bytes:
    """Generates a simple PDF bytes for the given report dict. Requires reportlab."""
    buf = BytesIO()
    if reportlab is None:
        # fallback: return plain text bytes
        buf.write(str(report).encode('utf-8'))
        return buf.getvalue()

    c = canvas.Canvas(buf, pagesize=letter)
    text = c.beginText(40, 750)
    text.setFont('Helvetica', 12)
    text.textLine('Medical Report')
    text.textLine('')
    for k, v in report.items():
        text.textLine(f'{k}: {v}')
    c.drawText(text)
    c.showPage()
    c.save()
    buf.seek(0)
    return buf.read()
