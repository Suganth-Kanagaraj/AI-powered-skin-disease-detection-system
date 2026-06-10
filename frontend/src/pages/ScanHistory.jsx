import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHistory } from '../api/scanApi'
import RecentScansTable from '../components/dashboard/RecentScansTable'
import { Search, ChevronDown, Activity, ArrowRight } from 'lucide-react'

export default function ScanHistory(){
  const [scans, setScans] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getHistory()
      .then(r => setScans(r.data))
      .catch(() => setScans([]))
      .finally(() => setLoading(false))
  }, [])

  // Filter scans based on search query and category (severity level)
  const filteredScans = scans.filter(s => {
    const matchesSearch = s.disease?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.filename?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'All' || s.severity?.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Scan History</h2>
        <p className="text-slate-400 font-semibold text-sm mt-1">
          View all your previous skin analyses
        </p>
      </div>

      {/* Search and Filter Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
          <input 
            type="text"
            placeholder="Search by disease..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1aa4a4] transition-colors duration-150"
          />
        </div>

        {/* Dropdown Select */}
        <div className="relative w-full sm:w-auto shrink-0">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-48 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 appearance-none focus:outline-none focus:border-[#1aa4a4] cursor-pointer pr-10"
          >
            <option value="All">All Categories</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 rounded-full border-4 border-[#1aa4a4] border-t-transparent animate-spin"></div>
          <span className="text-slate-500 font-bold text-xs mt-3">Loading history...</span>
        </div>
      ) : filteredScans.length === 0 ? (
        /* Empty State */
        <div className="w-full bg-white rounded-3xl border border-slate-100 p-16 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
            <Activity className="w-10 h-10 text-slate-400 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No scans found</h3>
          <p className="text-slate-400 font-medium text-sm mt-1 mb-6">Upload your first skin image to get started</p>
          <Link 
            to="/scan" 
            className="px-6 py-2.5 bg-[#1aa4a4] text-white font-bold rounded-xl shadow-md shadow-teal-500/10 hover:bg-[#158787] hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm"
          >
            <span>Start Scanning</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Results Table */
        <RecentScansTable scans={filteredScans} />
      )}
    </div>
  )
}
