import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
                <span className="pulse-dot"></span> Available for Work
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

        <div className="hero-visual-card">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">profile.json</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-profile-header">
              <div className="terminal-avatar">{about.avatarInitials}</div>
              <div className="terminal-user-info">
                <h3 className="terminal-username">{about.name}</h3>
                <span className="terminal-role">{about.subRole}</span>
              </div>
            </div>
            <div className="terminal-code-block">
              <p className="code-line"><span className="code-key">"focusAreas"</span>: [</p>
              {about.taglines?.map((tagline, i) => (
                <p key={i} className="code-line indent">
                  <span className="code-value">"{tagline}"</span>
                  {i < about.taglines.length - 1 ? ',' : ''}
                </p>
              ))}
              <p className="code-line">],</p>
              <p className="code-line">
                <span className="code-key">"status"</span>: <span className="code-value">"active"</span>
              </p>
            </div>
          </div>
        </div>
      </section>

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

