import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AdminAnalyticsChart({ diseaseCounts = [] }){
  if(!diseaseCounts || diseaseCounts.length === 0) return <div>No data</div>

  const chartData = diseaseCounts.map(d => ({
    name: d[0] || 'Unknown',
    count: d[1] || 0
  }))

  return (
    <div className="w-full h-80 bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Disease Counts (System-wide)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
