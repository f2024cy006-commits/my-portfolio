import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsPerson, BsBarChart, BsTools, BsRocket, BsBriefcase, BsEnvelope, BsChat, BsShield } from 'react-icons/bs'
import { MdSchool } from 'react-icons/md'
import { logout } from '../features/auth/authSlice'
import authService from '../features/auth/authService'
import { fetchPortfolio, updatePortfolio, resetPortfolioState } from '../features/portfolio/portfolioSlice'

const API_URL = `${import.meta.env.VITE_API_URL}/api`

// ─── Helpers ────────────────────────────────────────────────────────────────



function SaveBar({ isSaving, isError, message, onSave }) {
  return (
    <div className="save-bar">
      {isError && <span className="save-error">{message}</span>}
      {!isError && message === 'Saved successfully!' && (
        <span className="save-success">✓ {message}</span>
      )}
      <div className="save-bar-actions">
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
        <div key={idx} className="card-editor">
          <div className="card-editor-header">
            <strong>{stat.label || `Stat ${idx + 1}`}</strong>
            <button className="btn-remove" onClick={() => removeItem(idx)}>✕</button>
          </div>
          <div className="form-group">
            <label>Value (e.g. 3+, 100%)</label>
            <input
              placeholder="e.g. 3+"
              value={stat.value}
              onChange={(e) => updateItem(idx, 'value', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Label</label>
            <input
              placeholder="e.g. Years of experience"
              value={stat.label}
              onChange={(e) => updateItem(idx, 'label', e.target.value)}
            />
          </div>
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
      <div className="form-group">
        <label>Add a Skill</label>
        <div className="input-with-action">
          <input
            placeholder="e.g. React, Node.js, Cybersecurity…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          />
          <button
            type="button"
            className="input-action-btn"
            onClick={addSkill}
            aria-label="Add skill"
            title="Add skill"
          >
            →
          </button>
        </div>
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
  const addItem = () => onChange([...data, { title: '', description: '', link: '', category: 'Web Dev' }])
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
            <label>Category</label>
            <select
              className="admin-select"
              value={project.category || 'Other'}
              onChange={(e) => updateItem(idx, 'category', e.target.value)}
            >
              <option value="Web Dev">Web Dev</option>
              <option value="Security">Security</option>
              <option value="Systems">Systems</option>
              <option value="Other">Other</option>
            </select>
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

// ─── Contact Messages Viewer ──────────────────────────────────────────────────

function ContactMessagesViewer() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await axios.get(`${API_URL}/contact`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setMessages(response.data.data || [])
      } catch (err) {
        console.error('Failed to fetch contact messages:', err)
        setError(err.response?.data?.message || 'Unable to load messages.')
      } finally {
        setIsLoading(false)
      }
    }

    if (token) {
      fetchMessages()
    }
  }, [token])

  if (isLoading) {
    return (
      <div className="editor-section">
        <div className="loading-spinner" style={{ margin: '2rem 0' }} />
        <p>Loading messages…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="editor-section">
        <div className="login-error">{error}</div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="editor-section">
        <p className="muted" style={{ textAlign: 'center', padding: '2rem' }}>
          No contact messages yet. Check back when someone reaches out!
        </p>
      </div>
    )
  }

  return (
    <div className="editor-section messages-viewer">
      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg._id} className="message-card">
            <div className="message-header">
              <div>
                <strong className="message-name">{msg.name}</strong>
                <span className="message-email">{msg.email}</span>
              </div>
              <span className="message-date">
                {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-body">
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SecurityEditor() {
  const { token, email } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false })

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setStatus({ type: 'error', message: 'All password fields are required.' })
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      setStatus({ type: 'error', message: 'New password and confirm password do not match.' })
      return
    }

    if (form.newPassword.length < 6) {
      setStatus({ type: 'error', message: 'New password must be at least 6 characters long.' })
      return
    }

    try {
      setIsSubmitting(true)
      setStatus({ type: '', message: '' })

      const response = await authService.changePassword({
        token,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })

      setStatus({ type: 'success', message: response.message || 'Password updated successfully.' })
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to update password.'
      setStatus({ type: 'error', message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="editor-section security-editor">
      <div className="security-card">
        <div className="security-header">
          <h3>Admin Security</h3>
          <span>{email}</span>
        </div>

        <form onSubmit={handleSubmit} className="security-form">
          <div className="form-group password-input-group">
            <label htmlFor="currentPassword">Current Password</label>
            <div className="password-input-wrapper">
              <input
                id="currentPassword"
                type={showPasswords.current ? 'text' : 'password'}
                value={form.currentPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Enter current password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                aria-label={showPasswords.current ? 'Hide password' : 'Show password'}
              >
                {showPasswords.current ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group password-input-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="password-input-wrapper">
              <input
                id="newPassword"
                type={showPasswords.new ? 'text' : 'password'}
                value={form.newPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                aria-label={showPasswords.new ? 'Hide password' : 'Show password'}
              >
                {showPasswords.new ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group password-input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="password-input-wrapper">
              <input
                id="confirmPassword"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                aria-label={showPasswords.confirm ? 'Hide password' : 'Show password'}
              >
                {showPasswords.confirm ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
              </button>
            </div>
          </div>

          {status.message && (
            <div className={status.type === 'error' ? 'login-error' : 'save-success'}>
              {status.message}
            </div>
          )}

          <button type="submit" className="button primary btn-save" disabled={isSubmitting}>
            {isSubmitting ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'about', label: 'About', icon: BsPerson },
  { id: 'stats', label: 'Stats', icon: BsBarChart },
  { id: 'skills', label: 'Skills', icon: BsTools },
  { id: 'projects', label: 'Projects', icon: BsRocket },
  { id: 'experience', label: 'Experience', icon: BsBriefcase },
  { id: 'education', label: 'Education', icon: MdSchool },
  { id: 'contact', label: 'Contact', icon: BsEnvelope },
  { id: 'messages', label: 'Messages', icon: BsChat },
  { id: 'security', label: 'Security', icon: BsShield },
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
            {TABS.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  title={tab.label}
                >
                  <IconComponent size={18} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
          <div className="sidebar-footer">
            <SaveBar
              isSaving={isSaving}
              isError={isError}
              message={message}
              onSave={handleSave}
            />
          </div>
        </aside>

        {/* Content area */}
        <main className="admin-content">
          <div className="admin-section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {(() => {
                const currentTab = TABS.find((t) => t.id === activeTab)
                const IconComponent = currentTab?.icon
                return (
                  <>
                    {IconComponent && <IconComponent size={24} />}
                    <h2>{currentTab?.label}</h2>
                  </>
                )
              })()}
            </div>
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
          {activeTab === 'messages' && <ContactMessagesViewer />}
          {activeTab === 'security' && <SecurityEditor />}
        </main>
      </div>
    </div>
  )
}

export default AdminPage

