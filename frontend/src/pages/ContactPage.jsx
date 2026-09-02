import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BiSolidErrorCircle } from 'react-icons/bi'
import { MdMail, MdPhone } from 'react-icons/md'
import { RiLinkedinFill, RiGithubFill } from 'react-icons/ri'
import axios from 'axios'
import LiveMotionStrip from '../components/LiveMotionStrip'

const API_URL = import.meta.env.DEV ? '/api' : `${import.meta.env.VITE_API_URL}/api`

function ContactPage() {
  const { data } = useSelector((state) => state.portfolio)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [copiedField, setCopiedField] = useState(null)

  // null, 'sending', 'success', 'error'
  const [submitStatus, setSubmitStatus] = useState(null)

  if (!data) return null

  const { contact } = data

  // Copy email / phone
  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)

      setCopiedField(field)

      setTimeout(() => {
        setCopiedField(null)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  // Handle contact form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prevent empty submission
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      return
    }

    // Show sending state
    setSubmitStatus('sending')

    try {
      const response = await axios.post(`${API_URL}/contact`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      })

      console.log('Message submitted successfully:', response.data)

      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      })

      // Show success state
      setSubmitStatus('success')

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Contact form submission failed:', error)

      if (error.response) {
        console.error('Server response:', error.response.data)
        console.error('Status:', error.response.status)
      }

      // Show error state
      setSubmitStatus('error')

      // Hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }
  }

  return (
    <div className="contact-page-container">
      <div className="section-intro">
        <span className="eyebrow-accent">Say hello</span>

        <h1 className="page-title">
          Have a good idea? Let&apos;s talk.
        </h1>

        <p className="page-desc">
          Whether you have a project in mind, a thoughtful question, or simply want to compare notes, my inbox is open.
        </p>
      </div>

      <LiveMotionStrip items={['Start a conversation', 'Share an idea', 'Make something useful']} tone="emerald" />

      <div className="contact-interactive-layout">

        {/* Contact Info Cards */}
        <div className="contact-details-panel">
          <h3 className="panel-subtitle">Direct Channels</h3>

          <div className="direct-channels-list">

            {/* Email */}
            {contact?.email && (
              <div className="channel-interactive-card">
                <div className="channel-info">
                  <span className="channel-icon">
                    <MdMail size={20} />
                  </span>

                  <div>
                    <span className="channel-label">
                      Email Address
                    </span>

                    <a
                      href={`mailto:${contact.email}`}
                      className="channel-value-link"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  className={`btn-copy-clipboard ${
                    copiedField === 'email' ? 'success' : ''
                  }`}
                  onClick={() => handleCopy(contact.email, 'email')}
                >
                  {copiedField === 'email'
                    ? '✓ Copied'
                    : 'Copy'}
                </button>
              </div>
            )}

            {/* Phone */}
            {contact?.phone && (
              <div className="channel-interactive-card">
                <div className="channel-info">
                  <span className="channel-icon">
                    <MdPhone size={20} />
                  </span>

                  <div>
                    <span className="channel-label">
                      Phone Line
                    </span>

                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="channel-value-link"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  className={`btn-copy-clipboard ${
                    copiedField === 'phone' ? 'success' : ''
                  }`}
                  onClick={() => handleCopy(contact.phone, 'phone')}
                >
                  {copiedField === 'phone'
                    ? '✓ Copied'
                    : 'Copy'}
                </button>
              </div>
            )}
          </div>

          {/* Professional Profiles */}
          <h3 className="panel-subtitle label-margin">
            Professional Profiles
          </h3>

          <div className="profile-action-links">

            {/* LinkedIn */}
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

                <span className="tile-title">
                  LinkedIn
                </span>

                <span className="tile-sub">
                  Connect with me
                </span>
              </a>
            )}

            {/* GitHub */}
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

                <span className="tile-title">
                  GitHub
                </span>

                <span className="tile-sub">
                  View repositories
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-panel">
          <h3 className="panel-subtitle">
            Drop a Message
          </h3>

          <form
            onSubmit={handleSubmit}
            className="modern-contact-form"
          >

            {/* Name */}
            <div className="form-group-modern">
              <label htmlFor="name">
                Your Name
              </label>

              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="John Doe"
                disabled={submitStatus === 'sending'}
              />
            </div>

            {/* Email */}
            <div className="form-group-modern">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                placeholder="john@example.com"
                disabled={submitStatus === 'sending'}
              />
            </div>

            {/* Message */}
            <div className="form-group-modern">
              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                placeholder="Let's collaborate on..."
                disabled={submitStatus === 'sending'}
              />
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div
                className="form-submit-notification success"
                role="alert"
              >
                ✓ Message sent successfully! Thank you for reaching out.
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div
                className="form-submit-notification error"
                role="alert"
              >
                <BiSolidErrorCircle
                  size={18}
                  style={{
                    display: 'inline-block',
                    marginRight: '8px',
                    verticalAlign: 'middle',
                  }}
                />

                Unable to send your message right now.
                Please try again.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-modern primary-btn form-submit-btn"
              disabled={submitStatus === 'sending'}
            >
              {submitStatus === 'sending'
                ? 'Sending Message...'
                : submitStatus === 'success'
                  ? '✓ Message Sent'
                  : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage