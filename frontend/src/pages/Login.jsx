import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Activity, ArrowRight, Loader2 } from 'lucide-react'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handle = async (e) =>{
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    try{
      await login(email, password)
      navigate('/dashboard')
    }catch(err){
      console.error(err)
      alert('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 w-full max-w-md space-y-6">
        {/* Brand logo */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <Activity className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Welcome to DermAI</h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">Sign in to monitor your skin health</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handle} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1aa4a4] transition-all duration-150" 
              placeholder="Email address" 
              type="email"
              required
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1aa4a4] transition-all duration-150" 
              placeholder="Password" 
              type="password" 
              required
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-[#1aa4a4] text-white font-bold rounded-xl shadow-lg shadow-teal-500/10 hover:bg-[#158787] hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 text-sm"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer link */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-400 font-semibold">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#1aa4a4] hover:text-[#158787] font-bold transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
