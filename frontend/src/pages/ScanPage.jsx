import React, { useState, useRef } from 'react'
import { uploadScan } from '../api/scanApi'
import { Image as ImageIcon, Upload, Camera, Sparkles, Shield, Clock, HeartPulse, Loader2, CheckCircle2 } from 'lucide-react'

export default function ScanPage(){
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setResult(null) // clear previous results
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const selectedFile = e.dataTransfer.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setResult(null)
    }
  }

  const triggerBrowse = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!file) return
    setLoading(true)
    try {
      const res = await uploadScan(file)
      setResult(res.data)
    } catch(err) {
      console.error(err)
      alert('Scanning failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (sev) => {
    switch(sev?.toLowerCase()) {
      case 'mild': return 'text-green-600 bg-green-50 border-green-100'
      case 'moderate': return 'text-amber-600 bg-amber-50 border-amber-100'
      case 'severe': return 'text-rose-600 bg-rose-50 border-rose-100'
      default: return 'text-slate-600 bg-slate-50 border-slate-100'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">AI Skin Analysis</h2>
        <p className="text-slate-400 font-semibold text-sm mt-1">
          Upload a clear image of the affected skin area for AI diagnosis
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*" 
          onChange={handleFileChange}
          className="hidden" 
        />

        {/* Upload Box (Dashed Area) */}
        <div 
          onClick={triggerBrowse}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
            preview 
              ? 'border-[#1aa4a4] bg-teal-50/20' 
              : 'border-slate-200 hover:border-[#1aa4a4] hover:bg-slate-50/50'
          }`}
        >
          {preview ? (
            <div className="relative group max-w-xs">
              <img 
                src={preview} 
                alt="Selected skin area" 
                className="max-h-60 rounded-xl object-cover shadow-sm"
              />
              <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">Change Image</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto">
                <ImageIcon className="w-8 h-8 text-[#1aa4a4] stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-700">Upload Skin Image</h3>
                <p className="text-slate-400 font-medium text-sm">Drag & drop or click to browse</p>
                <p className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Supports JPG, PNG, WebP</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            type="button"
            onClick={triggerBrowse}
            className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-sm"
          >
            <Upload className="w-4 h-4 text-slate-400" />
            <span>Browse Files</span>
          </button>
          
          <button 
            type="button"
            onClick={triggerBrowse} // Capture fallback
            className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-sm"
          >
            <Camera className="w-4 h-4 text-slate-400" />
            <span>Use Camera</span>
          </button>
        </div>

        {/* Analyze trigger button (visible when file is loaded) */}
        {file && !result && (
          <div className="flex justify-center pt-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center space-x-2 px-8 py-3 bg-[#1aa4a4] text-white font-bold rounded-xl shadow-lg shadow-teal-500/10 hover:bg-[#158787] hover:shadow-xl transition-all duration-200 disabled:opacity-50 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Image...</span>
                </>
              ) : (
                <span>Analyze Skin Image</span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Prediction Output Results */}
      {result && (
        <div className="bg-white rounded-3xl border border-teal-100 p-8 shadow-sm border-t-4 border-t-[#1aa4a4] space-y-6 animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Diagnosis Result</span>
              <h3 className="text-2xl font-extrabold text-slate-800 flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-[#1aa4a4]" />
                <span>{result.disease}</span>
              </h3>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Confidence</span>
                <div className="text-lg font-extrabold text-[#00a8cc]">{result.confidence}%</div>
              </div>
              <div className="h-8 w-px bg-slate-100"></div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Severity</span>
                <div className={`px-3 py-0.5 mt-0.5 rounded-full text-xs font-bold border ${getSeverityColor(result.severity)}`}>
                  {result.severity}
                </div>
              </div>
            </div>
          </div>
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-5 space-y-2">
              <h4 className="text-sm font-bold text-slate-700">Recommendations</h4>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: AI-Powered */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100/80 flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#1aa4a4]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700">AI-Powered</h4>
            <p className="text-xs text-slate-400 font-semibold mt-1">Advanced deep learning analysis for 80+ skin conditions</p>
          </div>
        </div>

        {/* Card 2: Secure & Private */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100/80 flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700">Secure & Private</h4>
            <p className="text-xs text-slate-400 font-semibold mt-1">Your images are encrypted and never shared</p>
          </div>
        </div>

        {/* Card 3: Instant Results */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100/80 flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700">Instant Results</h4>
            <p className="text-xs text-slate-400 font-semibold mt-1">Get predictions in under 10 seconds</p>
          </div>
        </div>

        {/* Card 4: Medical Guidance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100/80 flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
            <HeartPulse className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700">Medical Guidance</h4>
            <p className="text-xs text-slate-400 font-semibold mt-1">Receive actionable healthcare recommendations</p>
          </div>
        </div>
      </div>
    </div>
  )
}
