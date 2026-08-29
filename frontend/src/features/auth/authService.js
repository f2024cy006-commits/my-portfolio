import axios from 'axios'

const API_URL = '/api/auth'

const login = async (password) => {
  const response = await axios.post(`${API_URL}/login`, { password })
  return response.data // { success, token }
}

const authService = { login }
export default authService

