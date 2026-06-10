import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ActivityChart({ scans = [] }){
  // Generate last 7 days of week names and dates
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const chartData = []
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toLocaleDateString()
    chartData.push({
      dateStr,
      name: daysOfWeek[d.getDay()],
      scans: 0
    })
  }

  // Aggregate real scans into the chartData slots
  if (scans && scans.length > 0) {
    scans.forEach(s => {
      const scanDate = new Date(s.created_at).toLocaleDateString()
      const match = chartData.find(item => item.dateStr === scanDate)
      if (match) {
        match.scans += 1
      }
    })
  }

  return (
    <div className="w-full h-80 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div>
        <h3 className="text-sm font-bold text-slate-700 tracking-wide uppercase">Weekly Activity</h3>
      </div>
      <div className="flex-1 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
            />
            <YAxis 
              domain={[0, 4]} 
              ticks={[0, 1, 2, 3, 4]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
            />
            <Tooltip 
              contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: 12 }}
              itemStyle={{ color: '#2dd4bf' }}
              labelClassName="text-slate-400 font-semibold"
            />
            <Line 
              type="monotone" 
              dataKey="scans" 
              stroke="#1aa4a4" 
              strokeWidth={3} 
              dot={{ r: 4, stroke: '#1aa4a4', strokeWidth: 2, fill: '#fff' }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
