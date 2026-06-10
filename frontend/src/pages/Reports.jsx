import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getReports } from '../api/reportApi'
import DownloadPDF from '../components/report/DownloadPDF'
import { FileText, Calendar, ShieldAlert, ArrowRight } from 'lucide-react'

export default function Reports(){
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getReports()
      .then(r => setReports(r.data))
      .catch(() => setReports([]))
      .finally(() => setLoading(false))
  }, [])

  const hasReports = reports && reports.length > 0

  const getSeverityBadgeColor = (sev) => {
    switch (sev?.toLowerCase()) {
      case 'mild': return 'text-green-600 bg-green-50 border-green-100'
      case 'moderate': return 'text-amber-600 bg-amber-50 border-amber-100'
      case 'severe': return 'text-rose-600 bg-rose-50 border-rose-100'
      default: return 'text-slate-600 bg-slate-50 border-slate-100'
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Medical Reports</h2>
        <p className="text-slate-400 font-semibold text-sm mt-1">
          View and download your generated reports
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 rounded-full border-4 border-[#1aa4a4] border-t-transparent animate-spin"></div>
          <span className="text-slate-500 font-bold text-xs mt-3">Loading reports...</span>
        </div>
      ) : !hasReports ? (
        /* Empty State */
        <div className="w-full bg-white rounded-3xl border border-slate-100 p-16 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
            <FileText className="w-10 h-10 text-slate-400 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No reports yet</h3>
          <p className="text-slate-400 font-medium text-sm mt-1 mb-6">Generate a report from your scan results</p>
          <Link 
            to="/history" 
            className="px-6 py-2.5 bg-[#1aa4a4] text-white font-bold rounded-xl shadow-md shadow-teal-500/10 hover:bg-[#158787] hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm"
          >
            <span>View Scans</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Reports List Card Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((rep) => (
            <div 
              key={rep.id} 
              className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#1aa4a4]">
                      <FileText className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-800">{rep.disease || 'Skin Assessment'}</h4>
                      <p className="text-xs text-[#00a8cc] font-bold">{rep.confidence ? `${rep.confidence}% Confidence` : 'N/A'}</p>
                    </div>
                  </div>
                  {rep.severity && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getSeverityBadgeColor(rep.severity)}`}>
                      {rep.severity}
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">{new Date(rep.created_at).toLocaleDateString()}</span>
                  </div>
                  {rep.recommendations && rep.recommendations.length > 0 && (
                    <div className="flex items-start space-x-2 pt-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <p className="line-clamp-2 leading-relaxed text-slate-400 font-medium">
                        {rep.recommendations[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-50 mt-6 pt-4 flex justify-end">
                <DownloadPDF reportId={rep.id} className="w-full sm:w-auto justify-center" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
