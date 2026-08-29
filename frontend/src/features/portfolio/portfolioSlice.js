import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import portfolioService from './portfolioService'

const initialState = {
  data: null,      // full portfolio document from MongoDB
  isLoading: false,
  isSaving: false,
  isError: false,
  message: '',
}

// Fetch the full public portfolio from the API
export const fetchPortfolio = createAsyncThunk(
  'portfolio/fetchPortfolio',
  async (_, thunkAPI) => {
    try {
      return await portfolioService.getPortfolio()
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Server unavailable'
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// Update portfolio (admin only — requires JWT token)
export const updatePortfolio = createAsyncThunk(
  'portfolio/updatePortfolio',
  async (sectionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await portfolioService.updatePortfolio(sectionData, token)
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Update failed'
      return thunkAPI.rejectWithValue(message)
    }
  },
)

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    resetPortfolioState: (state) => {
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPortfolio
      .addCase(fetchPortfolio.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // updatePortfolio
      .addCase(updatePortfolio.pending, (state) => {
        state.isSaving = true
        state.isError = false
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.isSaving = false
        state.data = action.payload
        state.message = 'Saved successfully!'
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.isSaving = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetPortfolioState } = portfolioSlice.actions
export default portfolioSlice.reducer
