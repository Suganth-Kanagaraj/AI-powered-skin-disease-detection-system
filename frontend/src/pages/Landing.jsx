import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react'

export default function Landing(){
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between">
      {/* Header bar */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">DermAI</h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Skin Disease Detection</p>
          </div>
        </div>
        <div>
          <Link 
            to="/login" 
            className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-600 font-bold rounded-xl text-sm transition-colors duration-150"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <main className="max-w-4xl mx-auto w-full px-6 py-12 flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-teal-50 rounded-full text-xs font-bold text-[#1aa4a4] border border-teal-100 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Advanced AI-Powered Healthcare</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-5xl font-black text-slate-800 tracking-tight leading-[1.1] max-w-2xl mx-auto">
            Detect Skin Diseases <span className="text-[#00a8cc]">Instantly</span> with AI
          </h2>
          <p className="text-slate-400 font-semibold text-lg max-w-lg mx-auto leading-relaxed">
            Get clinical-grade screening, progress monitoring, and medical guidance in seconds from home.
          </p>
        </div>

        <div>
          <Link 
            to="/login"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#1aa4a4] hover:bg-[#158787] text-white font-bold rounded-2xl shadow-xl shadow-teal-500/25 transition-all duration-300 text-base"
          >
            <span>Start Skin Screening</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Short Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl w-full">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#1aa4a4] mb-3">
              <Sparkles className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h4 className="font-bold text-slate-700 text-sm">80+ Conditions</h4>
            <p className="text-xs text-slate-400 font-semibold mt-1">Screening for a broad range of skin disorders</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-3">
              <Shield className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h4 className="font-bold text-slate-700 text-sm">Secure & Private</h4>
            <p className="text-xs text-slate-400 font-semibold mt-1">Your data is fully encrypted and protected</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
              <Clock className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h4 className="font-bold text-slate-700 text-sm">Instant Results</h4>
            <p className="text-xs text-slate-400 font-semibold mt-1">Predictions in under 10 seconds</p>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="py-6 border-t border-slate-100 text-center text-xs text-slate-400 font-semibold">
        &copy; {new Date().getFullYear()} DermAI. All rights reserved.
      </footer>
    </div>
  )
}
