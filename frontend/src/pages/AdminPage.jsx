import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { fetchPortfolio, updatePortfolio, resetPortfolioState } from '../features/portfolio/portfolioSlice'

// ─── Helpers ────────────────────────────────────────────────────────────────

function SaveBar({ isSaving, isError, message, onSave, onReset }) {
  return (
    <div className="save-bar">
      {isError && <span className="save-error">{message}</span>}
      {!isError && message === 'Saved successfully!' && (
        <span className="save-success">✓ {message}</span>
      )}
      <div className="save-bar-actions">
        <button className="btn-ghost" onClick={onReset} disabled={isSaving}>Reset</button>
        <button className="button primary btn-save" onClick={onSave} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

// ─── Section editors ─────────────────────────────────────────────────────────

function AboutEditor({ data, onChange }) {
  const fields = [
    { key: 'name', label: 'Full Name' },
    { key: 'avatarInitials', label: 'Avatar Initials (e.g. MR)' },
    { key: 'eyebrow', label: 'Eyebrow Text' },
    { key: 'headline', label: 'Hero Headline' },
    { key: 'subRole', label: 'Sub-role (below name in card)' },
  ]

  return (
    <div className="editor-section">
      {fields.map(({ key, label }) => (
        <div className="form-group" key={key}>
          <label>{label}</label>
          <input
            type="text"
            value={data[key] || ''}
            onChange={(e) => onChange({ ...data, [key]: e.target.value })}
          />
        </div>
      ))}
      <div className="form-group">
        <label>Bio (paragraph text)</label>
        <textarea
          rows={4}
          value={data.bio || ''}
          onChange={(e) => onChange({ ...data, bio: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Hero Card Bullet Points (one per line)</label>
        <textarea
          rows={4}
          value={(data.taglines || []).join('\n')}
          onChange={(e) => onChange({ ...data, taglines: e.target.value.split('\n') })}
        />
      </div>
      <div className="form-group form-group-inline">
        <label>
          <input
            type="checkbox"
            checked={data.availableForWork || false}
            onChange={(e) => onChange({ ...data, availableForWork: e.target.checked })}
          />
          Show "Available for opportunities" badge
        </label>
      </div>
    </div>
  )
}

function StatsEditor({ data, onChange }) {
  const updateItem = (idx, field, val) => {
    const updated = data.map((s, i) => (i === idx ? { ...s, [field]: val } : s))
    onChange(updated)
  }
  const addItem = () => onChange([...data, { value: '', label: '' }])
  const removeItem = (idx) => onChange(data.filter((_, i) => i !== idx))

  return (
    <div className="editor-section">
      {data.map((stat, idx) => (
        <div key={idx} className="list-item-row">
          <input
            placeholder="Value (e.g. 3+)"
            value={stat.value}
            onChange={(e) => updateItem(idx, 'value', e.target.value)}
          />
          <input
            placeholder="Label (e.g. Years of experience)"
            value={stat.label}
            onChange={(e) => updateItem(idx, 'label', e.target.value)}
          />
          <button className="btn-remove" onClick={() => removeItem(idx)}>✕</button>
        </div>
      ))}
      <button className="btn-add" onClick={addItem}>+ Add Stat</button>
    </div>
  )
}

function SkillsEditor({ data, onChange }) {
  const [input, setInput] = useState('')

  const addSkill = () => {
    const trimmed = input.trim()
    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed])
      setInput('')
    }
  }

  const removeSkill = (skill) => onChange(data.filter((s) => s !== skill))

  return (
    <div className="editor-section">
      <div className="form-group form-group-row">
        <input
          placeholder="Add a skill…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
        />
        <button className="btn-add-inline" onClick={addSkill}>Add</button>
      </div>
      <div className="skills-list skills-list-edit">
        {data.map((skill) => (
          <span key={skill} className="skill-tag skill-tag-edit">
            {skill}
            <button onClick={() => removeSkill(skill)}>✕</button>
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectsEditor({ data, onChange }) {
  const updateItem = (idx, field, val) => {
    onChange(data.map((p, i) => (i === idx ? { ...p, [field]: val } : p)))
  }
  const addItem = () => onChange([...data, { title: '', description: '', link: '' }])
  const removeItem = (idx) => onChange(data.filter((_, i) => i !== idx))
  const moveUp = (idx) => {
    if (idx === 0) return
    const arr = [...data]
    ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
    onChange(arr)
  }
  const moveDown = (idx) => {
    if (idx === data.length - 1) return
    const arr = [...data]
    ;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
    onChange(arr)
  }

  return (
    <div className="editor-section">
      {data.map((project, idx) => (
        <div key={idx} className="card-editor">
          <div className="card-editor-header">
            <strong>Project {idx + 1}</strong>
            <div className="card-editor-actions">
              <button className="btn-ghost-sm" onClick={() => moveUp(idx)}>↑</button>
              <button className="btn-ghost-sm" onClick={() => moveDown(idx)}>↓</button>
              <button className="btn-remove" onClick={() => removeItem(idx)}>✕</button>
            </div>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              value={project.title}
              onChange={(e) => updateItem(idx, 'title', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={3}
              value={project.description}
              onChange={(e) => updateItem(idx, 'description', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Project Link (optional)</label>
            <input
              type="url"
              placeholder="https://..."
              value={project.link || ''}
              onChange={(e) => updateItem(idx, 'link', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={addItem}>+ Add Project</button>
    </div>
  )
}

function ExperienceEditor({ data, onChange }) {
  const updateField = (idx, field, val) => {
    onChange(data.map((e, i) => (i === idx ? { ...e, [field]: val } : e)))
  }
  const addItem = () =>
    onChange([...data, { company: '', role: '', period: '', bullets: [] }])
  const removeItem = (idx) => onChange(data.filter((_, i) => i !== idx))

  return (
    <div className="editor-section">
      {data.map((exp, idx) => (
        <div key={idx} className="card-editor">
          <div className="card-editor-header">
            <strong>{exp.company || `Experience ${idx + 1}`}</strong>
            <button className="btn-remove" onClick={() => removeItem(idx)}>✕</button>
          </div>
          {[['company', 'Company'], ['role', 'Role / Title'], ['period', 'Period (e.g. June 2025 – Dec 2025)']].map(
            ([field, label]) => (
              <div className="form-group" key={field}>
                <label>{label}</label>
                <input
                  value={exp[field] || ''}
                  onChange={(e) => updateField(idx, field, e.target.value)}
                />
              </div>
            ),
          )}
          <div className="form-group">
            <label>Bullet Points (one per line)</label>
            <textarea
              rows={5}
              value={(exp.bullets || []).join('\n')}
              onChange={(e) =>
                updateField(idx, 'bullets', e.target.value.split('\n'))
              }
            />
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={addItem}>+ Add Experience</button>
    </div>
  )
}

function EducationEditor({ data, onChange }) {
  const updateField = (idx, field, val) => {
    onChange(data.map((e, i) => (i === idx ? { ...e, [field]: val } : e)))
  }
  const addItem = () =>
    onChange([...data, { institution: '', degree: '', location: '', coursework: '' }])
  const removeItem = (idx) => onChange(data.filter((_, i) => i !== idx))

  return (
    <div className="editor-section">
      {data.map((edu, idx) => (
        <div key={idx} className="card-editor">
          <div className="card-editor-header">
            <strong>{edu.institution || `Education ${idx + 1}`}</strong>
            <button className="btn-remove" onClick={() => removeItem(idx)}>✕</button>
          </div>
          {[
            ['institution', 'Institution'],
            ['degree', 'Degree'],
            ['location', 'Location'],
            ['coursework', 'Coursework (comma-separated)'],
          ].map(([field, label]) => (
            <div className="form-group" key={field}>
              <label>{label}</label>
              <input
                value={edu[field] || ''}
                onChange={(e) => updateField(idx, field, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
      <button className="btn-add" onClick={addItem}>+ Add Education</button>
    </div>
  )
}

function ContactEditor({ data, onChange }) {
  const fields = [
    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+92 300 0000000' },
    { key: 'linkedin', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/in/...' },
    { key: 'github', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/...' },
  ]
  return (
    <div className="editor-section">
      {fields.map(({ key, label, type, placeholder }) => (
        <div className="form-group" key={key}>
          <label>{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            value={data[key] || ''}
            onChange={(e) => onChange({ ...data, [key]: e.target.value })}
          />
        </div>
      ))}
    </div>
  )
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'about', label: '👤 About' },
  { id: 'stats', label: '📊 Stats' },
  { id: 'skills', label: '🛠 Skills' },
  { id: 'projects', label: '🚀 Projects' },
  { id: 'experience', label: '💼 Experience' },
  { id: 'education', label: '🎓 Education' },
  { id: 'contact', label: '📬 Contact' },
]

// ─── Main admin page ──────────────────────────────────────────────────────────

function AdminPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, isLoading, isSaving, isError, message } = useSelector((state) => state.portfolio)

  const [activeTab, setActiveTab] = useState('about')
  const [draft, setDraft] = useState(null)

  useEffect(() => {
    dispatch(fetchPortfolio())
  }, [dispatch])

  useEffect(() => {
    if (data && !draft) {
      setDraft(JSON.parse(JSON.stringify(data))) // deep clone
    }
  }, [data, draft])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  const handleSave = () => {
    dispatch(resetPortfolioState())
    dispatch(updatePortfolio(draft))
  }

  const handleReset = () => {
    if (data) setDraft(JSON.parse(JSON.stringify(data)))
    dispatch(resetPortfolioState())
  }

  if (isLoading || !draft) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading editor…</p>
      </div>
    )
  }

  const updateSection = (section) => (value) => {
    setDraft((prev) => ({ ...prev, [section]: value }))
    dispatch(resetPortfolioState())
  }

  return (
    <div className="admin-shell">
      {/* Admin top bar */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <Link to="/" className="admin-logo-link">← Portfolio</Link>
          <span className="admin-title">Admin Dashboard</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </header>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <p className="sidebar-label">Sections</p>
          <nav>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <SaveBar
              isSaving={isSaving}
              isError={isError}
              message={message}
              onSave={handleSave}
              onReset={handleReset}
            />
          </div>
        </aside>

        {/* Content area */}
        <main className="admin-content">
          <div className="admin-section-header">
            <h2>{TABS.find((t) => t.id === activeTab)?.label}</h2>
            <a href="/" target="_blank" rel="noreferrer" className="preview-link">
              Preview live site →
            </a>
          </div>

          {activeTab === 'about' && (
            <AboutEditor data={draft.about} onChange={updateSection('about')} />
          )}
          {activeTab === 'stats' && (
            <StatsEditor data={draft.stats} onChange={updateSection('stats')} />
          )}
          {activeTab === 'skills' && (
            <SkillsEditor data={draft.skills} onChange={updateSection('skills')} />
          )}
          {activeTab === 'projects' && (
            <ProjectsEditor data={draft.projects} onChange={updateSection('projects')} />
          )}
          {activeTab === 'experience' && (
            <ExperienceEditor data={draft.experience} onChange={updateSection('experience')} />
          )}
          {activeTab === 'education' && (
            <EducationEditor data={draft.education} onChange={updateSection('education')} />
          )}
          {activeTab === 'contact' && (
            <ContactEditor data={draft.contact} onChange={updateSection('contact')} />
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminPage

