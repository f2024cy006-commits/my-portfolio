import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * Wraps a route so only authenticated admins can access it.
 * Redirects unauthenticated visitors to /admin/login.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

export default ProtectedRoute

