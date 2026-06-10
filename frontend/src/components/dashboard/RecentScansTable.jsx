import React from 'react'
import DownloadPDF from '../report/DownloadPDF'

export default function RecentScansTable({ scans = [] }){
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2">Filename</th>
          <th className="px-4 py-2">Disease</th>
          <th className="px-4 py-2">Confidence</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Report</th>
        </tr>
      </thead>
      <tbody>
        {scans.map(s=> (
          <tr key={s.id} className="border-t">
            <td className="px-4 py-2">{s.filename}</td>
            <td className="px-4 py-2">{s.disease}</td>
            <td className="px-4 py-2">{s.confidence}</td>
            <td className="px-4 py-2">{new Date(s.created_at).toLocaleString()}</td>
            <td className="px-4 py-2">{s.metadata && s.metadata.report_id ? <DownloadPDF reportId={s.metadata.report_id} /> : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
