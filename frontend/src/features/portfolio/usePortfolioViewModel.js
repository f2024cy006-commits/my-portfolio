import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkHealth } from './portfolioSlice'

export const usePortfolioViewModel = () => {
  const dispatch = useDispatch()
  const { health, isLoading, isError, message } = useSelector((state) => state.portfolio)

  useEffect(() => {
    dispatch(checkHealth())
  }, [dispatch])

  return {
    health,
    isLoading,
    isError,
    message,
  }
}
