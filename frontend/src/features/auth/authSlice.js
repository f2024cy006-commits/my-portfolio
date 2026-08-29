import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Persist token in localStorage
const token = localStorage.getItem('adminToken') || null

const initialState = {
  token,
  email: null,
  isAuthenticated: !!token,
  isLoading: false,
  isError: false,
  message: '',
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login({ email, password })
      localStorage.setItem('adminToken', data.token)
      return { token: data.token, email: data.email }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password'
      return thunkAPI.rejectWithValue(message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('adminToken')
      state.token = null
      state.email = null
      state.isAuthenticated = false
      state.message = ''
      state.isError = false
    },
    clearAuthError: (state) => {
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.token = action.payload.token
        state.email = action.payload.email
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.token = null
        state.email = null
        state.isAuthenticated = false
      })
  },
})

export const { logout, clearAuthError } = authSlice.actions
export default authSlice.reducer

