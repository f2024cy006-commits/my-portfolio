const express = require('express')
const Portfolio = require('../models/Portfolio')
const { protect } = require('../middleware/auth')

const router = express.Router()

// GET /api/portfolio  — public
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.getInstance()
    res.json({ success: true, data: portfolio })
  } catch (error) {
    console.error('GET /api/portfolio error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// PUT /api/portfolio  — admin only
router.put('/', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.getInstance()

    const allowedSections = ['about', 'stats', 'skills', 'projects', 'experience', 'education', 'contact']

    for (const section of allowedSections) {
      if (req.body[section] !== undefined) {
        portfolio[section] = req.body[section]
      }
    }

    // Mark nested objects as modified so mongoose saves them
    allowedSections.forEach((s) => portfolio.markModified(s))

    await portfolio.save()

    res.json({ success: true, data: portfolio })
  } catch (error) {
    console.error('PUT /api/portfolio error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router

