import React from 'react'

export default function Loader(){
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="loader" style={{width:48, height:48, borderRadius:24, border:'6px solid #e5e7eb', borderTopColor:'#3b82f6', animation:'spin 1s linear infinite'}} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
