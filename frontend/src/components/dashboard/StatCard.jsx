import React from 'react'

export default function StatCard({ title, value, icon: Icon, iconBgColor, iconColor }){
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-all duration-300">
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <span className="text-3xl font-extrabold text-slate-800 mt-2 leading-none">{value}</span>
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgColor || 'bg-slate-50'}`}>
          <Icon className={`w-6 h-6 ${iconColor || 'text-slate-400'} stroke-[2]`} />
        </div>
      )}
    </div>
  )
}
