import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ActivityChart({ scans = [] }){
  if(!scans || scans.length === 0) return <div>No activity data</div>

  // simple aggregation: count scans by date
  const scansByDate = {}
  scans.forEach(s => {
    const date = new Date(s.created_at).toLocaleDateString()
    scansByDate[date] = (scansByDate[date] || 0) + 1
  })

  const chartData = Object.entries(scansByDate).map(([date, count]) => ({
    date,
    scans: count
  })).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-7)

  return (
    <div className="w-full h-80 bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Scan Activity (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="scans" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
