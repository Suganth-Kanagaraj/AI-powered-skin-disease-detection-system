import React, { useState } from 'react'
import { downloadReportPdf } from '../../api/reportApi'

export default function DownloadPDF({ reportId, className = '' }){
  const [loading, setLoading] = useState(false)

  const handleDownload = async ()=>{
    setLoading(true)
    try{
      const res = await downloadReportPdf(reportId)
      const blob = new Blob([res.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `report_${reportId}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    }catch(err){
      console.error(err)
      alert('Download failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <button onClick={handleDownload} disabled={loading} className={className}>
      {loading ? 'Downloading...' : 'Download PDF'}
    </button>
  )
}
