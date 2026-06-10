import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function AppLayout(){
  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-slate-800">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  )
}
