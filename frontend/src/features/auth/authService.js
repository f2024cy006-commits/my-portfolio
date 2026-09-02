import axios from 'axios'

const API_URL = import.meta.env.DEV ? '/api/auth' : `${import.meta.env.VITE_API_URL}/api/auth`

const login = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  return response.data // { success, token, email }
}

const changePassword = async ({ token, currentPassword, newPassword }) => {
  const response = await axios.post(
    `${API_URL}/change-password`,
    { currentPassword, newPassword },
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return response.data
}

const authService = { login, changePassword }
export default authService

