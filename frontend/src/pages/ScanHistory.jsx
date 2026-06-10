import React, { useEffect, useState } from 'react'
import { getHistory } from '../api/scanApi'
import RecentScansTable from '../components/dashboard/RecentScansTable'

export default function ScanHistory(){
  const [scans, setScans] = useState([])
  useEffect(()=>{
    getHistory().then(r=> setScans(r.data)).catch(()=> setScans([]))
  }, [])

  return (
    <div>
      <h2 className="text-2xl mb-4">Scan History</h2>
      <RecentScansTable scans={scans} />
    </div>
  )
}
