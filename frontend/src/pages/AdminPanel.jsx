import React, { useEffect, useState } from 'react'
import { getAdminAnalytics } from '../api/adminApi'
import AdminAnalyticsChart from '../components/admin/AdminAnalyticsChart'

export default function AdminPanel(){
  const [analytics, setAnalytics] = useState(null)
  useEffect(()=>{
    getAdminAnalytics().then(r=> setAnalytics(r.data)).catch(()=> setAnalytics(null))
  }, [])

  if(!analytics) return <div>Loading admin data...</div>

  return (
    <div>
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Scans</div>
          <div className="text-2xl font-bold">{analytics.total_scans}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Reports</div>
          <div className="text-2xl font-bold">{analytics.total_reports}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Distinct Diseases</div>
          <div className="text-2xl font-bold">{analytics.disease_counts ? analytics.disease_counts.length : 0}</div>
        </div>
      </div>
      <div className="mb-6">
        <AdminAnalyticsChart diseaseCounts={analytics.disease_counts || []} />
      </div>
    </div>
  )
}
