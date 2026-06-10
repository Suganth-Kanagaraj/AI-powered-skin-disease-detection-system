import React, { useEffect, useState } from 'react'
import { getAdminAnalytics } from '../api/adminApi'

export default function AdminPanel(){
  const [analytics, setAnalytics] = useState(null)
  useEffect(()=>{
    getAdminAnalytics().then(r=> setAnalytics(r.data)).catch(()=> setAnalytics(null))
  }, [])

  if(!analytics) return <div>Loading admin data...</div>

  return (
    <div>
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Total scans: {analytics.total_scans}</div>
        <div className="p-4 bg-white rounded shadow">Total reports: {analytics.total_reports}</div>
      </div>
      <div className="mt-4">
        <h3>Disease counts</h3>
        <ul>
          {analytics.disease_counts && analytics.disease_counts.map((d, idx)=> (
            <li key={idx}>{d[0]}: {d[1]}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
