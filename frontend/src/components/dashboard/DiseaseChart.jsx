import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6B9D']

export default function DiseaseChart({ data = [] }){
  if(!data || data.length === 0) return <div>No disease data</div>
  
  const chartData = data.map(d => ({
    name: d[0] || 'Unknown',
    value: d[1] || 0
  }))

  return (
    <div className="w-full h-80 bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Disease Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" labelLine={false} label dataKey="value">
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
