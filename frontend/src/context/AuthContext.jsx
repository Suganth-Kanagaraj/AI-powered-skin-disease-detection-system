import React, { createContext, useState, useEffect } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    const init = async ()=>{
      const token = localStorage.getItem('access_token')
      if(token){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try{
          const res = await api.get('/auth/me')
          setUser(res.data)
        }catch(err){
          setUser(null)
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
        }
      }
      setLoading(false)
    }
    init()
  }, [])

  const login = async (email, password) =>{
    const res = await api.post('/auth/login', { email, password })
    const data = res.data
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    const me = await api.get('/auth/me')
    setUser(me.data)
    return me.data
  }

  const register = async (payload) =>{
    const res = await api.post('/auth/register', payload)
    const data = res.data
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    const me = await api.get('/auth/me')
    setUser(me.data)
    return me.data
  }

  const logout = () =>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
