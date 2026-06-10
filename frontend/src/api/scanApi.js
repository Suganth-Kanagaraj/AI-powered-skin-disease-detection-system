import api from './axios'

export const uploadScan = (file, onUploadProgress) => {
  const form = new FormData()
  form.append('file', file)
  return api.post('/scan/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress
  })
}

export const getHistory = () => api.get('/scan/history')
