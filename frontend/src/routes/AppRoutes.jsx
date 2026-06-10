import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import ScanPage from '../pages/ScanPage'
import ScanResult from '../pages/ScanResult'
import Profile from '../pages/Profile'
import Reports from '../pages/Reports'
import ScanHistory from '../pages/ScanHistory'
import AIAssistant from '../pages/AIAssistant'
import AdminPanel from '../pages/AdminPanel'
import ProtectedRoute from './ProtectedRoute'
import AppLayout from '../components/layout/AppLayout'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/scan" element={<ScanPage/>} />
          <Route path="/scan/result" element={<ScanResult/>} />
          <Route path="/history" element={<ScanHistory/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/assistant" element={<AIAssistant/>} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Route>

      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminPanel />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
