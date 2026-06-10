import React, { useEffect, useState } from 'react'
import { getReports } from '../api/reportApi'
import DownloadPDF from '../components/report/DownloadPDF'

export default function Reports(){
  const [reports, setReports] = useState([])

  useEffect(()=>{
    getReports().then(r=> setReports(r.data)).catch(()=> setReports([]))
  }, [])

  return (
    <div>
      <h2 className="text-2xl mb-4">My Reports</h2>
      <ul>
        {reports.map(rep=> (
          <li key={rep.id} className="p-3 mb-2 bg-white rounded shadow flex items-center justify-between">
            <div>
              <div><strong>{rep.disease}</strong> — {rep.confidence}%</div>
              <div>Severity: {rep.severity}</div>
            </div>
            <div>
              <DownloadPDF reportId={rep.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
