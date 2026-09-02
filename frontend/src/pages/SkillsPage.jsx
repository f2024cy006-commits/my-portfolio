import { useSelector } from 'react-redux'

function SkillsPage() {
  const { data } = useSelector((state) => state.portfolio)

  if (!data) return null

  const { skills } = data

  // Define skill categorization filters
  const securityKeywords = ['cybersecurity', 'encryption', 'cryptography', 'secure']
  const frontendKeywords = ['react', 'tailwind', 'html', 'css', 'javascript', 'typescript', 'ui/ux']
  const backendKeywords = ['node.js', 'express', 'apis', 'mongodb', 'database']

  const getSkillCategory = (skill) => {
    const s = skill.toLowerCase()
    if (securityKeywords.some((keyword) => s.includes(keyword))) {
      return 'Security & Encryption'
    }
    if (frontendKeywords.some((keyword) => s.includes(keyword))) {
      return 'Frontend Development'
    }
    if (backendKeywords.some((keyword) => s.includes(keyword))) {
      return 'Backend & Systems'
    }
    return 'Dev Tools & Methods'
  }

  // Group skills
  const categorized = {
    'Security & Encryption': [],
    'Frontend Development': [],
    'Backend & Systems': [],
    'Dev Tools & Methods': [],
  }

  skills?.forEach((skill) => {
    const cat = getSkillCategory(skill)
    if (categorized[cat]) {
      categorized[cat].push(skill)
    } else {
      categorized['Dev Tools & Methods'].push(skill)
    }
  })

  // Icons or symbols for categories
  const categoryMeta = {
    'Security & Encryption': { icon: '🛡️', color: 'emerald' },
    'Frontend Development': { icon: '💻', color: 'violet' },
    'Backend & Systems': { icon: '⚙️', color: 'blue' },
    'Dev Tools & Methods': { icon: '🔧', color: 'cyan' },
  }

  return (
    <div className="skills-page-container">
      <div className="section-intro">
        <span className="eyebrow-accent">How I work</span>
        <h1 className="page-title">Tools I reach for.</h1>
        <p className="page-desc">
          The technologies are only part of the story. I care about clear interfaces, resilient systems, and leaving a codebase easier to live with.
        </p>
      </div>

      <div className="skills-marquee" aria-hidden="true">
        <div className="skills-marquee-track">
          <span>Security</span><i>✦</i><span>Frontend</span><i>✦</i><span>Backend</span><i>✦</i><span>Systems</span><i>✦</i>
          <span>Security</span><i>✦</i><span>Frontend</span><i>✦</i><span>Backend</span><i>✦</i><span>Systems</span><i>✦</i>
        </div>
      </div>

      <div className="skills-categorized-grid">
        {Object.keys(categorized).map((cat) => {
          const items = categorized[cat]
          if (items.length === 0) return null
          const meta = categoryMeta[cat]

          return (
            <div key={cat} className={`skills-category-card border-${meta.color}`}>
              <div className="skills-live-constellation" aria-hidden="true">
                <span className="constellation-line line-one"></span>
                <span className="constellation-line line-two"></span>
                <span className="constellation-star star-one">✦</span>
                <span className="constellation-star star-two">✦</span>
                <span className="constellation-star star-three">✦</span>
              </div>
              <div className="skills-cat-header">
                <span className="skills-cat-icon">{meta.icon}</span>
                <h3 className="skills-cat-title">{cat}</h3>
              </div>
              <div className="skills-cat-body">
                {items.map((skill, index) => (
                  <div key={index} className={`skill-interactive-pill skill-flow-${index % 4}`}>
                    <span className="skill-pill-bullet"></span>
                    <span className="skill-pill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillsPage

