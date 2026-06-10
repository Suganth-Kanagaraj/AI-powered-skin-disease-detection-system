import React from 'react'
import { Link } from 'react-router-dom'
import DownloadPDF from '../report/DownloadPDF'
import { FileText, ArrowRight } from 'lucide-react'

export default function RecentScansTable({ scans = [] }){
  const hasScans = scans && scans.length > 0

  if (!hasScans) {
    return (
      <div className="w-full bg-white rounded-2xl border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
        <p className="text-slate-500 font-medium mb-4">No scans yet. Upload your first skin image to get started.</p>
        <Link 
          to="/scan" 
          className="px-6 py-2.5 bg-[#1aa4a4] text-white font-bold rounded-xl shadow-md shadow-teal-500/10 hover:bg-[#158787] hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm"
        >
          <span>Start Scanning</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'mild':
        return 'bg-green-50 text-green-700 border border-green-200'
      case 'moderate':
        return 'bg-amber-50 text-amber-700 border border-amber-200'
      case 'severe':
        return 'bg-rose-50 text-rose-700 border border-rose-200'
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-200'
    }
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Filename</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Disease</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Confidence</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {scans.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                <td className="px-6 py-4 text-sm font-semibold text-slate-600 truncate max-w-[150px]" title={s.filename}>
                  {s.filename}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800">
                  {s.disease || 'Pending'}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-[#00a8cc]">
                  {s.confidence ? `${s.confidence}%` : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm">
                  {s.severity ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide ${getSeverityStyle(s.severity)}`}>
                      {s.severity}
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                  {new Date(s.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  {s.meta_data && s.meta_data.report_id ? (
                    <DownloadPDF reportId={s.meta_data.report_id} />
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
