import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { User, Mail, Shield, LogOut } from 'lucide-react'

export default function Profile(){
  const { user, logout } = useContext(AuthContext)
  if(!user) return (
    <div className="h-full flex items-center justify-center min-h-[50vh]">
      <p className="text-slate-500 font-bold">Not logged in</p>
    </div>
  )

  const avatarLetter = (user.name || user.email || 'U').charAt(0).toUpperCase()

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Profile Settings</h2>
        <p className="text-slate-400 font-semibold text-sm mt-1">
          Manage your account details and security settings
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
        {/* User Card */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
          <div className="w-24 h-24 rounded-full bg-[#00a8cc] text-white font-extrabold flex items-center justify-center text-3xl shadow-md">
            {avatarLetter}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-2xl font-extrabold text-slate-800">{user.name || 'User'}</h3>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-[#1aa4a4] border border-teal-100 uppercase tracking-wide">
              {user.role} Account
            </span>
          </div>
        </div>

        {/* Profile Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
            <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-700">{user.name || 'N/A'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-700">{user.email}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Role</label>
            <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
              <Shield className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-700 capitalize">{user.role}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex justify-end">
          <button 
            onClick={logout} 
            className="flex items-center space-x-2 px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl border border-rose-200 transition-colors duration-150 text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </div>
    </div>
  )
}
