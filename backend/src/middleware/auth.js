const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded.admin || !decoded.email) {
      return res.status(401).json({ success: false, message: 'Not authorized, invalid admin token' })
    }

    const admin = await Admin.findOne({ email: decoded.email.toLowerCase() })
    if (!admin) {
      return res.status(403).json({ success: false, message: 'Forbidden: unauthorized email' })
    }

    req.admin = decoded
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Not authorized, token invalid' })
  }
}

module.exports = { protect }

