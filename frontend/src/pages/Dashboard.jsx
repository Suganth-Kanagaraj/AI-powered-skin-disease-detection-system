import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardStats } from '../api/dashboardApi'
import StatCard from '../components/dashboard/StatCard'
import RecentScansTable from '../components/dashboard/RecentScansTable'
import DiseaseChart from '../components/dashboard/DiseaseChart'
import ActivityChart from '../components/dashboard/ActivityChart'
import { AuthContext } from '../context/AuthContext'
import { Activity, CheckCircle, ShieldAlert, Zap, UploadCloud } from 'lucide-react'

export default function Dashboard(){
  const [stats, setStats] = useState(null)
  const { user } = useContext(AuthContext)

  useEffect(()=>{
    getDashboardStats()
      .then(r => setStats(r.data))
      .catch(() => setStats({
        total_scans: 0,
        total_reports: 0,
        recent_scans: [],
        disease_distribution: []
      }))
  }, [])

  if(!stats) {
    return (
      <div className="h-full flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#1aa4a4] border-t-transparent animate-spin"></div>
          <span className="text-slate-500 font-bold text-sm">Loading dashboard data...</span>
        </div>
      </div>
    )
  }

  // Compute metrics from scans
  const totalScans = stats.total_scans || 0
  const completed = totalScans
  
  // Calculate average confidence
  const scansCount = stats.recent_scans?.length || 0
  const avgConfidence = scansCount > 0 
    ? Math.round(stats.recent_scans.reduce((acc, curr) => acc + (curr.confidence || 0), 0) / scansCount) 
    : 0

  // Calculate emergencies (severe cases)
  const emergencies = stats.recent_scans?.filter(s => s.severity?.toLowerCase() === 'severe').length || 0

  // Capitalize name
  const userName = user?.name ? user.name.toUpperCase() : 'USER'

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, <span className="text-[#00a8cc]">{userName}</span>
          </h2>
          <p className="text-slate-400 font-semibold text-sm mt-1">
            Monitor your skin health and AI predictions
          </p>
        </div>
        <div>
          <Link
            to="/scan"
            className="inline-flex items-center space-x-2 px-5 py-3 bg-[#1aa4a4] text-white font-bold rounded-2xl shadow-lg shadow-teal-500/10 hover:bg-[#158787] hover:shadow-xl transition-all duration-300"
          >
            <UploadCloud className="w-5 h-5" />
            <span>New Scan</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Scans" 
          value={totalScans} 
          icon={Activity} 
          iconBgColor="bg-teal-50" 
          iconColor="text-[#1aa4a4]" 
        />
        <StatCard 
          title="Completed" 
          value={completed} 
          icon={CheckCircle} 
          iconBgColor="bg-emerald-50" 
          iconColor="text-emerald-500" 
        />
        <StatCard 
          title="Avg Confidence" 
          value={`${avgConfidence}%`} 
          icon={Zap} 
          iconBgColor="bg-blue-50" 
          iconColor="text-blue-500" 
        />
        <StatCard 
          title="Emergencies" 
          value={emergencies} 
          icon={ShieldAlert} 
          iconBgColor="bg-rose-50" 
          iconColor="text-rose-500" 
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityChart scans={stats.recent_scans || []} />
        <DiseaseChart data={stats.disease_distribution || []} />
      </div>

      {/* History table section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Recent Scans</h3>
        <RecentScansTable scans={stats.recent_scans || []} />
      </div>
    </div>
  )
}
