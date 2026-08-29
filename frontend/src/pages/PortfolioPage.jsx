import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPortfolio } from '../features/portfolio/portfolioSlice'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

function PortfolioPage() {
  const dispatch = useDispatch()
  const { data, isLoading, isError, message } = useSelector((state) => state.portfolio)

  useEffect(() => {
    dispatch(fetchPortfolio())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading portfolio…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="error-screen">
        <h2>Could not load portfolio</h2>
        <p>{message}</p>
        <p className="muted">Make sure the backend is running on port 5002.</p>
      </div>
    )
  }

  if (!data) return null

  const { about, stats, skills, projects, experience, education, contact } = data

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">{about.name}</div>
        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <Link to="/admin/login" className="admin-link" title="Admin">
          ⚙
        </Link>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="about">
          <div className="hero-copy">
            <p className="eyebrow">{about.eyebrow}</p>
            <h1>{about.headline}</h1>
            <p className="lead">{about.bio}</p>
            <div className="actions">
              <a href="#projects" className="button primary">View Projects</a>
              <a href="#contact" className="button secondary">Let&apos;s Talk</a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Profile summary card">
            {about.availableForWork && (
              <div className="panel-badge">Available for opportunities</div>
            )}
            <div className="profile-block">
              <div className="avatar">{about.avatarInitials}</div>
              <div>
                <strong>{about.name}</strong>
                <span>{about.subRole}</span>
              </div>
            </div>
            <ul>
              {about.taglines?.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* STATS */}
        <section className="stats" aria-label="Highlights">
          {stats?.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        {/* PROJECTS */}
        <section className="content-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Projects built with security and usability in mind.</h2>
          </div>
          <div className="card-grid">
            {projects?.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-thumb" aria-hidden="true" />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.link && (
                  <a href={project.link} className="project-link" target="_blank" rel="noreferrer">
                    View project →
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="content-section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <h2>Skills and tools from my academic and professional work.</h2>
          </div>
          <div className="skills-list">
            {skills?.map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="content-section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Professional work and responsibilities.</h2>
          </div>
          <div className="experience-box">
            {experience?.map((exp, i) => (
              <div key={i} className="experience-item">
                <div className="experience-header">
                  <div>
                    <h3>{exp.company}</h3>
                    <p>{exp.role}</p>
                  </div>
                  <span>{exp.period}</span>
                </div>
                <ul>
                  {exp.bullets?.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="content-section" id="education">
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Academic background.</h2>
          </div>
          <div className="education-box">
            {education?.map((edu, i) => (
              <div key={i} className="education-row">
                <div>
                  <h3>{edu.institution}</h3>
                  <p>{edu.degree}</p>
                  {edu.coursework && (
                    <p className="muted">Coursework: {edu.coursework}</p>
                  )}
                </div>
                <span>{edu.location}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="content-section contact-section" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Let&apos;s connect</p>
            <h2>Open to opportunities in secure frontend engineering and cybersecurity-focused product development.</h2>
          </div>
          <div className="contact-box">
            {contact?.email && (
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            )}
            {contact?.phone && (
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            )}
            {contact?.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            )}
            {contact?.github && (
              <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default PortfolioPage

