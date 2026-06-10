import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { LayoutGrid, Upload, Activity, MessageSquare, FileText, User, LogOut, ChevronLeft } from 'lucide-react'

export default function Sidebar(){
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const activePath = location.pathname

  if (!user) return null

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
    { name: 'Scan Skin', path: '/scan', icon: Upload },
    { name: 'Scan History', path: '/history', icon: Activity },
    { name: 'AI Assistant', path: '/assistant', icon: MessageSquare },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Profile', path: '/profile', icon: User },
  ]

  // Extract avatar letter
  const avatarLetter = (user.name || user.email || 'U').charAt(0).toUpperCase()

  return (
    <aside className="w-72 bg-white flex flex-col justify-between border-r border-slate-100 h-screen sticky top-0 z-30 shrink-0">
      {/* Brand Logo Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">DermAI</h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Skin Disease Detection</p>
          </div>
        </div>
      </div>

      {/* Menu Links */}
      <div className="flex-1 px-4 py-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activePath === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1aa4a4] text-white shadow-lg shadow-teal-500/10'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-[#1aa4a4]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* User Info Tray at Bottom */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center space-x-3 p-2 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#00a8cc] text-white font-bold flex items-center justify-center text-lg shadow-sm">
            {avatarLetter}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 leading-none">
              {user.name || 'User'}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold mt-1">
              {user.role === 'admin' ? 'Administrator' : 'User'}
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between px-2 text-slate-400">
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors duration-150 py-1"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
          <button className="hover:text-slate-600 transition-colors duration-150">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
