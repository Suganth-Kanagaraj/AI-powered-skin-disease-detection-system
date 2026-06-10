import React, { useEffect, useState } from 'react'
import { getDashboardStats } from '../api/dashboardApi'
import StatCard from '../components/dashboard/StatCard'
import RecentScansTable from '../components/dashboard/RecentScansTable'
import DiseaseChart from '../components/dashboard/DiseaseChart'
import ActivityChart from '../components/dashboard/ActivityChart'

export default function Dashboard(){
  const [stats, setStats] = useState(null)

  useEffect(()=>{
    getDashboardStats().then(r=> setStats(r.data)).catch(()=> setStats({total_scans:0, total_reports:0, recent_scans:[], disease_distribution:[]}))
  }, [])

  if(!stats) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Scans" value={stats.total_scans} />
        <StatCard title="Total Reports" value={stats.total_reports} />
        <StatCard title="Distinct Diseases" value={stats.disease_distribution ? stats.disease_distribution.length : 0} />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <DiseaseChart data={stats.disease_distribution || []} />
        <ActivityChart scans={stats.recent_scans || []} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg mb-2">Recent Scans</h3>
        <RecentScansTable scans={stats.recent_scans || []} />
      </div>
    </div>
  )
}
