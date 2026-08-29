import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PortfolioPage from './pages/PortfolioPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public portfolio */}
        <Route path="/" element={<PortfolioPage />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback — redirect any unknown path to home */}
        <Route path="*" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
