import api from './axios'

export const getAdminAnalytics = () => api.get('/admin/analytics')
