import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearAuthError } from '../features/auth/authSlice'

function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    return () => {
      dispatch(clearAuthError())
    }
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.trim()) {
      dispatch(login(password))
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <Link to="/" className="login-back-link">← Back to portfolio</Link>

        <div className="login-header-block">
          <div className="login-icon-badge">🔐</div>
          <h1>Admin Login</h1>
          <p>Enter your password to access the portfolio editor.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Admin Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              autoFocus
            />
          </div>

          {isError && <div className="login-error">{message}</div>}

          <button type="submit" className="login-submit-btn" disabled={isLoading}>
            {isLoading ? 'Verifying…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage

