const express = require('express')
const nodemailer = require('nodemailer')
const ContactMessage = require('../models/ContactMessage')
const { protect } = require('../middleware/auth')

const router = express.Router()

const sendAdminNotification = async ({ name, email, message }) => {
  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log('SMTP not configured. Skipping admin email notification for contact form.')
    return
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const adminEmail = process.env.MAIL_TO || process.env.ADMIN_EMAIL || smtpUser

  await transporter.sendMail({
    from: process.env.MAIL_FROM || smtpUser,
    to: adminEmail,
    subject: `New Portfolio Contact Message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    html: `
      <h3>New portfolio contact message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `,
  })
}

router.post('/', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.',
    })
  }

  const trimmedName = String(name).trim()
  const trimmedEmail = String(email).trim().toLowerCase()
  const trimmedMessage = String(message).trim()

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({
      success: false,
      message: 'Please provide valid contact details.',
    })
  }

  try {
    const savedMessage = await ContactMessage.create({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    })

    try {
      await sendAdminNotification({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      })
    } catch (emailError) {
      console.warn('Admin email notification failed:', emailError.message)
    }

    res.status(201).json({
      success: true,
      message: 'Your message was sent successfully.',
      data: savedMessage,
    })
  } catch (error) {
    console.error('Contact form save error:', error)
    res.status(500).json({
      success: false,
      message: 'Unable to send your message right now.',
    })
  }
})

router.get('/', protect, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    res.json({ success: true, data: messages })
  } catch (error) {
    console.error('Get contact messages error:', error)
    res.status(500).json({ success: false, message: 'Unable to fetch messages.' })
  }
})

module.exports = router
