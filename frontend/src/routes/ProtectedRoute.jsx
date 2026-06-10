import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/ui/Loader'

const ProtectedRoute = ({ children, requiredRole } ) => {
  const { user, loading } = useContext(AuthContext)

  if(loading) return <Loader />

  const token = localStorage.getItem('access_token')
  if(!token || !user) return <Navigate to="/login" replace />

  if(requiredRole && user.role !== requiredRole){
    return <Navigate to="/" replace />
  }

  if(children) return children
  return <Outlet />
}

export default ProtectedRoute
