import { useSelector } from 'react-redux'
import LiveMotionStrip from '../components/LiveMotionStrip'

function ExperiencePage() {
  const { data } = useSelector((state) => state.portfolio)

  if (!data) return null

  const { experience } = data

  return (
    <div className="experience-page-container">
      <div className="section-intro">
        <span className="eyebrow-accent">Professional Path</span>
        <h1 className="page-title">Work Experience</h1>
        <p className="page-desc">
          The places, people, and projects that have shaped how I build.
        </p>
      </div>

      <LiveMotionStrip items={['Learn', 'Collaborate', 'Ship', 'Grow']} tone="emerald" />

      <div className="timeline-modern-wrapper">
        <div className="timeline-center-line"></div>

        {experience?.map((exp, index) => (
          <div key={index} className="timeline-modern-item">
            <div className="timeline-badge-node">
              <span className="badge-pulsing-core"></span>
            </div>
            
            <div className="timeline-content-card">
              <div className="timeline-card-header">
                <div className="timeline-company-block">
                  <h3 className="timeline-job-title">{exp.role}</h3>
                  <span className="timeline-company-name">@ {exp.company}</span>
                </div>
                <span className="timeline-job-period">{exp.period}</span>
              </div>
              <div className="timeline-card-body">
                <ul className="timeline-bullets-list">
                  {exp.bullets?.map((bullet, idx) => (
                    <li key={idx} className="timeline-bullet-item">
                      <span className="bullet-connector"></span>
                      <p className="bullet-text">{bullet}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {(!experience || experience.length === 0) && (
          <div className="timeline-empty">
            <p>No work experience logged yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExperiencePage

