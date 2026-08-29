const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../models/Admin')
const { protect } = require('../middleware/auth')

const router = express.Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  const normalizedEmail = String(email).trim().toLowerCase()

  try {
    const admin = await Admin.findOne({ email: normalizedEmail })

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const token = jwt.sign({ admin: true, email: normalizedEmail }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({ success: true, token, email: normalizedEmail })
  } catch (error) {
    console.error('Admin login error:', error)
    res.status(500).json({ success: false, message: 'Server error during login' })
  }
})

// POST /api/auth/change-password
router.post('/change-password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Current and new passwords are required' })
  }

  if (String(newPassword).length < 6) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long' })
  }

  try {
    const admin = await Admin.findOne({ email: String(req.admin.email).toLowerCase() })
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' })
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.passwordHash)
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' })
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10)
    await admin.save()

    res.json({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({ success: false, message: 'Server error while updating password' })
  }
})

module.exports = router

