import React, { useState } from 'react'
import { downloadReportPdf } from '../../api/reportApi'
import { DownloadCloud } from 'lucide-react'

export default function DownloadPDF({ reportId, className = '' }){
  const [loading, setLoading] = useState(false)

  const handleDownload = async (e)=>{
    e.preventDefault()
    e.stopPropagation()
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
    <button 
      onClick={handleDownload} 
      disabled={loading} 
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#e0f2fe] text-[#0369a1] hover:bg-[#bae6fd] hover:text-[#0c4a6e] font-bold rounded-lg text-xs transition-colors duration-150 disabled:opacity-50 ${className}`}
    >
      <DownloadCloud className="w-3.5 h-3.5" />
      <span>{loading ? 'Downloading...' : 'Download'}</span>
    </button>
  )
}
