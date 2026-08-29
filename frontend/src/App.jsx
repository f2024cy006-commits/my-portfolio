import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolio } from './features/portfolio/portfolioSlice'
import './App.css'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import ExperiencePage from './pages/ExperiencePage'
import EducationPage from './pages/EducationPage'
import ContactPage from './pages/ContactPage'

import AdminLoginPage from './pages/AdminLoginPage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'

// Layout Route Wrapper that loads global portfolio state
function PublicLayoutWrapper() {
  const dispatch = useDispatch()
  const { data, isLoading, isError, message } = useSelector((state) => state.portfolio)

  useEffect(() => {
    dispatch(fetchPortfolio())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p className="loading-text">Synchronizing portfolio matrix...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="error-screen">
        <div className="error-shield">⚠️</div>
        <h2>Connection Timeout</h2>
        <p>{message}</p>
        <p className="muted">Please verify the backend microservice is active on port 5002.</p>
        <button onClick={() => dispatch(fetchPortfolio())} className="btn-modern primary-btn error-retry-btn">
          Retry Sync
        </button>
      </div>
    )
  }

  if (!data) return null

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Portfolio Sub-routes wrapped in Layout */}
        <Route element={<PublicLayoutWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin Access Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback to Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
