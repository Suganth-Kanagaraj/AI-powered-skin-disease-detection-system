import React from 'react'

export default function ScanResult({ result }){
  if(!result) return null
  return (
    <div>
      <h3>{result.disease} — {result.confidence}%</h3>
      <p>Severity: {result.severity}</p>
    </div>
  )
}
