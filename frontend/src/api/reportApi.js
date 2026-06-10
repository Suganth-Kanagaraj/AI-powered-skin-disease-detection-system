import api from './axios'

export const getReports = () => api.get('/reports')
export const generateReport = (payload) => api.post('/reports', payload)
export const downloadReportPdf = (id) => api.get(`/reports/${id}/download`, { responseType: 'blob' })
