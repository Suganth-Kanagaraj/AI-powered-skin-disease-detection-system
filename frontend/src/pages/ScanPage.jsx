import React, { useState } from 'react'
import { uploadScan } from '../api/scanApi'

export default function ScanPage(){
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!file) return
    const res = await uploadScan(file)
    setResult(res.data)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Scan</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <button className="btn">Upload</button>
      </form>
      {result && (
        <div className="mt-4">
          <h3>Prediction: {result.disease} ({result.confidence}%)</h3>
          <p>Severity: {result.severity}</p>
        </div>
      )}
    </div>
  )
}
