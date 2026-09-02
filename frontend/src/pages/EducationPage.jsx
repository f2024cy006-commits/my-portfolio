import { useSelector } from 'react-redux'
import { MdSchool } from 'react-icons/md'
import LiveMotionStrip from '../components/LiveMotionStrip'

function EducationPage() {
  const { data } = useSelector((state) => state.portfolio)

  if (!data) return null

  const { education } = data

  return (
    <div className="education-page-container">
      <div className="section-intro">
        <span className="eyebrow-accent">Academic History</span>
        <h1 className="page-title">Education & Credentials</h1>
        <p className="page-desc">
          Structured background in Computer Networks, Cryptography, Database Systems, and Cybersecurity.
        </p>
      </div>

      <LiveMotionStrip items={['Curiosity', 'Practice', 'Progress', 'Perspective']} tone="cyan" />

      <div className="education-modern-list">
        {education?.map((edu, index) => (
          <div key={index} className="modern-education-card">
            <div className="edu-card-glow"></div>
            <div className="edu-card-header">
              <div className="edu-institution-info">
                <span className="edu-icon-shield">
                  <MdSchool size={24} />
                </span>
                <div>
                  <h3 className="edu-institution-name">{edu.institution}</h3>
                  <p className="edu-degree-title">{edu.degree}</p>
                </div>
              </div>
              <span className="edu-location-badge">{edu.location}</span>
            </div>
            
            {edu.coursework && (
              <div className="edu-card-body">
                <h4 className="coursework-section-title">Core Coursework</h4>
                <div className="coursework-tags-grid">
                  {edu.coursework.split(',').map((course, idx) => (
                    <span key={idx} className="course-item-tag">
                      {course.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {(!education || education.length === 0) && (
          <div className="edu-empty">
            <p>No education details logged yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EducationPage

