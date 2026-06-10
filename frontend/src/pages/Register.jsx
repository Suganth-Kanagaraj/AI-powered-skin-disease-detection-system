import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handle = async (e) =>{
    e.preventDefault()
    try{
      await register({ email, password, name })
      navigate('/dashboard')
    }catch(err){
      alert('Registration failed')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handle}>
        <input className="w-full p-2 mb-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-2 mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 mb-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn">Register</button>
      </form>
    </div>
  )
}
