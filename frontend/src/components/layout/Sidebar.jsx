import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar(){
  return (
    <aside className="w-64 bg-gray-50 p-4 border-r">
      <ul className="space-y-2">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/scan">Scan</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </aside>
  )
}
