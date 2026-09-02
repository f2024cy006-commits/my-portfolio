import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LiveMotionStrip from '../components/LiveMotionStrip'

function HomePage() {
  const { data } = useSelector((state) => state.portfolio)

  if (!data) return null

  const { about, stats } = data

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-text-content">
          <div className="badge-glow-container">
            <span className="eyebrow-badge">{about.eyebrow}</span>
            {about.availableForWork && (
              <span className="status-indicator">
                <span className="pulse-dot"></span> Open to good work
              </span>
            )}
          </div>
          <h1 className="hero-headline">{about.headline}</h1>
          <p className="hero-bio-lead">{about.bio}</p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn-modern primary-btn">
              Explore Projects <span className="btn-arrow">→</span>
            </Link>
            <Link to="/contact" className="btn-modern secondary-btn">
              Get in touch
            </Link>
          </div>
        </div>

        <div className="hero-visual-card profile-summary-card">
          <div className="profile-card-header">
            <span className="profile-card-kicker">A little about me</span>
            <span className="profile-card-mark">✦</span>
          </div>
          <div className="profile-summary-body">
            <div className="terminal-profile-header">
              <div className="terminal-avatar">{about.avatarInitials}</div>
              <div className="terminal-user-info">
                <h3 className="terminal-username">{about.name}</h3>
                <span className="terminal-role">{about.subRole}</span>
              </div>
            </div>
            <div className="profile-focus-list">
              <p className="profile-focus-label">Currently exploring</p>
              {about.taglines?.map((tagline, i) => (
                <div key={i} className="profile-focus-item">
                  <span className="focus-check">+</span>
                  <span>{tagline}</span>
                </div>
              ))}
              <p className="profile-status"><span className="pulse-dot"></span> Making useful things</p>
            </div>
          </div>
        </div>
      </section>

      <LiveMotionStrip items={['Design', 'Build', 'Secure', 'Refine']} tone="cyan" />

      {/* Stats Section */}
      <section className="stats-dashboard">
        <div className="stats-grid">
          {stats?.map((stat, index) => (
            <div key={index} className="dashboard-stat-card">
              <div className="stat-glow-effect"></div>
              <span className="stat-metric">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage

