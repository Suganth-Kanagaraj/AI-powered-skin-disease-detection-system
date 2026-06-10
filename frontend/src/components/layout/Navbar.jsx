import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  return (
    <nav className="w-full bg-white shadow p-3 flex justify-between items-center">
      <div className="text-lg font-semibold"><Link to="/">AI Skin</Link></div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/scan">Scan</Link>
            <Link to="/profile">{user.name || user.email}</Link>
            <button onClick={logout} className="text-sm">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
