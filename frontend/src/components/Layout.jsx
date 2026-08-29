import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education', href: '/education' },
  { label: 'Contact', href: '/contact' },
]

function Layout({ children }) {
  const { data } = useSelector((state) => state.portfolio)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const name = data?.about?.name || 'Maarij Ur Rehman'

  return (
    <div className="app-shell">
      <header className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="nav-brand">
            <span className="brand-accent">&lt;</span>
            {name}
            <span className="brand-accent"> /&gt;</span>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                end={item.href === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          {isAuthenticated && (
            <div className="navbar-actions">
              <Link to="/admin" className="admin-trigger" title="Admin dashboard">
                <span className="trigger-icon">⚙</span>
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="main-content-layout">
        <div className="fade-in-container">
          {children}
        </div>
      </main>

      <footer className="footer-container">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} {name}. Built with security and modern aesthetics.</p>
          {isAuthenticated && (
            <div className="footer-links">
              <Link to="/admin" className="footer-admin-link">Admin Dashboard</Link>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}

export default Layout

