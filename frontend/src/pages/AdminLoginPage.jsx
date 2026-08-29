import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdLock } from 'react-icons/md'
import { login, clearAuthError } from '../features/auth/authSlice'

function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password.trim()) {
      return
    }

    dispatch(login({ email: trimmedEmail, password }))
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <Link to="/" className="login-back-link">← Back to portfolio</Link>

        <div className="login-header-block">
          <div className="login-icon-badge">
            <MdLock size={28} />
          </div>
          <h1>Admin Login</h1>
          <p>Enter your admin email and password to access the portfolio editor.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="form-group password-input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
              </button>
            </div>
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

