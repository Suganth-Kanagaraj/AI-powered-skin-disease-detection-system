import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">AI Skin Detection</h1>
      <p className="mb-4">Welcome. Please <Link to="/login" className="text-blue-600">login</Link> or <Link to="/register" className="text-blue-600">register</Link>.</p>
    </div>
  )
}
