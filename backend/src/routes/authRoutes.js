const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { password } = req.body

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required' })
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid password' })
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '7d' })

  res.json({ success: true, token })
})

module.exports = router

