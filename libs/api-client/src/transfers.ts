import api from './http'

export const getTransfers = async () => {
  const response = await api.get('/transfers')
  return response.data
}

export const getAll = async () => {
  const response = await api.get('api/transfers')
  return response.data
}