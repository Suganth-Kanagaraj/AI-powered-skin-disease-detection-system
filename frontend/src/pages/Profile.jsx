import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Profile(){
  const { user, logout } = useContext(AuthContext)
  if(!user) return <div>Not logged in</div>
  return (
    <div className="p-4">
      <h2 className="text-xl">Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout} className="btn mt-2">Logout</button>
    </div>
  )
}
