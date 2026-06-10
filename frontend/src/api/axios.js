import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const instance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

// attach access token if present
const access = localStorage.getItem('access_token')
if(access) instance.defaults.headers.common['Authorization'] = `Bearer ${access}`

// interceptor to try refreshing on 401
instance.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config
    if(err.response && err.response.status === 401 && !original._retry){
      original._retry = true
      const refresh = localStorage.getItem('refresh_token')
      if(refresh){
        try{
          const r = await axios.post(`${API_BASE}/auth/refresh`, { refresh_token: refresh })
          const tokens = r.data
          localStorage.setItem('access_token', tokens.access_token)
          localStorage.setItem('refresh_token', tokens.refresh_token)
          instance.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`
          original.headers['Authorization'] = `Bearer ${tokens.access_token}`
          return instance(original)
        }catch(e){
          // failed refresh -> logout handled by app
        }
      }
    }
    return Promise.reject(err)
  }
)

export default instance
