import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'

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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const closeMobileNav = () => setIsMobileNavOpen(false)

  return (
    <div className="app-shell">
      <header className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="nav-brand">
            {name}
          </Link>
          <nav className="nav-links desktop-nav" aria-label="Main navigation">
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
              <Link to="/admin" className="admin-trigger" title="Open editor">
                <span className="trigger-icon">⚙</span>
              </Link>
            </div>
          )}
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileNavOpen}
          >
            <MdMenu size={25} />
          </button>
        </div>
      </header>

      <div className={`mobile-nav-backdrop ${isMobileNavOpen ? 'open' : ''}`} onClick={closeMobileNav} />
      <aside className={`mobile-nav-drawer ${isMobileNavOpen ? 'open' : ''}`} aria-hidden={!isMobileNavOpen}>
        <div className="mobile-drawer-header">
          <span>Menu</span>
          <button type="button" onClick={closeMobileNav} aria-label="Close navigation menu">
            <MdClose size={24} />
          </button>
        </div>
        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              onClick={closeMobileNav}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              end={item.href === '/'}
            >
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </NavLink>
          ))}
        </nav>
        <p className="mobile-drawer-note">A small window into my work.</p>
      </aside>

      <main className="main-content-layout">
        <div className="fade-in-container">
          {children}
        </div>
      </main>

      <footer className="footer-container">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} {name}. Thoughtful work for the web.</p>
          {isAuthenticated && (
            <div className="footer-links">
              <Link to="/admin" className="footer-admin-link">Open editor</Link>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}

export default Layout

