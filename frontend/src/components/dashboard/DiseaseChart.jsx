import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#00a8cc', '#1aa4a4', '#f59e0b', '#ef4444', '#a855f7']

export default function DiseaseChart({ data = [] }){
  const hasData = data && data.length > 0
  
  const chartData = hasData ? data.map(d => ({
    name: d[0] || 'Unknown',
    value: d[1] || 0
  })) : []

  return (
    <div className="w-full h-80 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div>
        <h3 className="text-sm font-bold text-slate-700 tracking-wide uppercase">Disease Distribution</h3>
      </div>
      
      {!hasData ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 font-semibold text-sm">
          No data available yet
        </div>
      ) : (
        <div className="flex-1 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" labelLine={false} label dataKey="value" outerRadius={70}>
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: 12 }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                tick={{ fill: '#64748b', fontSize: 11 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
