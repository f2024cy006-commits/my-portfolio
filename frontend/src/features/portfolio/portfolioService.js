import axios from 'axios'

const API_URL = import.meta.env.DEV ? '/api' : `${import.meta.env.VITE_API_URL}/api`

const getPortfolio = async () => {
  const response = await axios.get(`${API_URL}/portfolio`)
  return response.data.data
}

const updatePortfolio = async (sectionData, token) => {
  const response = await axios.put(`${API_URL}/portfolio`, sectionData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data
}

const getHealth = async () => {
  const response = await axios.get(`${API_URL}/health`)
  return response.data
}

const portfolioService = {
  getPortfolio,
  updatePortfolio,
  getHealth,
}

export default portfolioService
