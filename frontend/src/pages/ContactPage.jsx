import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BiSolidErrorCircle } from 'react-icons/bi'
import { MdMail, MdPhone } from 'react-icons/md'
import { RiLinkedinFill, RiGithubFill } from 'react-icons/ri'
import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api`

function ContactPage() {
  const { data } = useSelector((state) => state.portfolio)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [copiedField, setCopiedField] = useState(null)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'sending', 'success', 'error'

  if (!data) return null

  const { contact } = data

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setSubmitStatus('sending')

    try {
      await axios.post(`${API_URL}/contact`, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      })

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus(null), 4000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 4000)
    }
  }

  return (
    <div className="contact-page-container">
      <div className="section-intro">
        <span className="eyebrow-accent">Get In Touch</span>
        <h1 className="page-title">Let&apos;s build secure systems together.</h1>
        <p className="page-desc">
          Feel free to reach out for frontend opportunities, cybersecurity collaboration, or general inquiries.
        </p>
      </div>

      <div className="contact-interactive-layout">
        {/* Contact Info Cards */}
        <div className="contact-details-panel">
          <h3 className="panel-subtitle">Direct Channels</h3>
          <div className="direct-channels-list">
            
            {contact?.email && (
              <div className="channel-interactive-card">
                <div className="channel-info">
                  <span className="channel-icon">
                    <MdMail size={20} />
                  </span>
                  <div>
                    <span className="channel-label">Email Address</span>
                    <a href={`mailto:${contact.email}`} className="channel-value-link">{contact.email}</a>
                  </div>
                </div>
                <button
                  className={`btn-copy-clipboard ${copiedField === 'email' ? 'success' : ''}`}
                  onClick={() => handleCopy(contact.email, 'email')}
                >
                  {copiedField === 'email' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}

            {contact?.phone && (
              <div className="channel-interactive-card">
                <div className="channel-info">
                  <span className="channel-icon">
                    <MdPhone size={20} />
                  </span>
                  <div>
                    <span className="channel-label">Phone Line</span>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="channel-value-link">{contact.phone}</a>
                  </div>
                </div>
                <button
                  className={`btn-copy-clipboard ${copiedField === 'phone' ? 'success' : ''}`}
                  onClick={() => handleCopy(contact.phone, 'phone')}
                >
                  {copiedField === 'phone' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>

          <h3 className="panel-subtitle label-margin">Professional Profiles</h3>
          <div className="profile-action-links">
            {contact?.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="profile-link-tile linkedin-tile"
              >
                <span className="tile-icon">
                  <RiLinkedinFill size={24} />
                </span>
                <span className="tile-title">LinkedIn</span>
                <span className="tile-sub">Connect with me</span>
              </a>
            )}

            {contact?.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="profile-link-tile github-tile"
              >
                <span className="tile-icon">
                  <RiGithubFill size={24} />
                </span>
                <span className="tile-title">GitHub</span>
                <span className="tile-sub">View repositories</span>
              </a>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-panel">
          <h3 className="panel-subtitle">Drop a Message</h3>
          <form onSubmit={handleSubmit} className="modern-contact-form">
            <div className="form-group-modern">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="form-group-modern">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group-modern">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's collaborate on..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="form-submit-notification success">
                ✓ Thank you! Your message was sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-submit-notification error">
                <BiSolidErrorCircle size={18} style={{ display: 'inline-block', marginRight: '8px' }} />
                Unable to send your message right now. Please try again.
              </div>
            )}

            <button
              type="submit"
              className="btn-modern primary-btn form-submit-btn"
              disabled={submitStatus === 'sending'}
            >
              {submitStatus === 'sending' ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

