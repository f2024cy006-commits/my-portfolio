import { useState } from 'react'
import { useSelector } from 'react-redux'

function ProjectsPage() {
  const { data } = useSelector((state) => state.portfolio)
  const [filter, setFilter] = useState('All')

  if (!data) return null

  const { projects } = data

  const categories = ['All', 'Web Dev', 'Security', 'Systems', 'Other']

  const getCategory = (proj) => {
    if (proj.category && categories.includes(proj.category)) {
      return proj.category
    }

    const text = `${proj.title} ${proj.description}`.toLowerCase()

    if (
      text.includes('security') ||
      text.includes('encrypt') ||
      text.includes('encrypted') ||
      text.includes('cryptography') ||
      text.includes('secure file') ||
      text.includes('secure data')
    ) {
      return 'Security'
    }

    if (
      text.includes('mern') ||
      text.includes('commerce') ||
      text.includes('e-commerce') ||
      text.includes('web') ||
      text.includes('full-stack') ||
      text.includes('frontend') ||
      text.includes('react') ||
      text.includes('node') ||
      text.includes('express') ||
      text.includes('dashboard')
    ) {
      return 'Web Dev'
    }

    if (
      text.includes('c++') ||
      text.includes('oop') ||
      text.includes('console') ||
      text.includes('cloud') ||
      text.includes('system')
    ) {
      return 'Systems'
    }

    return 'Other'
  }

  const filteredProjects = projects?.filter((proj) => {
    if (filter === 'All') return true
    return getCategory(proj) === filter
  })

  return (
    <div className="projects-page-container">
      <div className="section-intro">
        <span className="eyebrow-accent">Portfolio Work</span>
        <h1 className="page-title">Projects built with security and usability.</h1>
        <p className="page-desc">
          Explore a curated selection of full-stack applications, encrypted database implementations, and system-level applications. Use the filters below to sort by categories.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs-container">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn-tab ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="projects-modern-grid">
        {filteredProjects?.map((project, index) => {
          const cat = getCategory(project)
          return (
            <article key={index} className="modern-project-card">
              <div className="card-media-placeholder">
                <span className="project-category-tag">{cat}</span>
              </div>
              <div className="project-card-details">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-description">{project.description}</p>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-action-link"
                  >
                    View Project Code <span className="arrow-icon">↗</span>
                  </a>
                ) : (
                  <span className="project-action-link-disabled">
                    Internal Repository
                  </span>
                )}
              </div>
            </article>
          )
        })}
        {filteredProjects?.length === 0 && (
          <div className="empty-projects-state">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage

