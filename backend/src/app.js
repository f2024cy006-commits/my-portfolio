const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://www.maarijurrehman.dev',
  'https://maarijurrehman.dev',
  'https://my-portfolio-smoky-iota-fd2kvkh8k4.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      callback(new Error(`CORS not allowed for origin: ${origin}`))
    },
    credentials: true,
  }),
)
app.use(express.json())

// Routes
const authRoutes = require('./routes/authRoutes')
const portfolioRoutes = require('./routes/portfolioRoutes')
const contactRoutes = require('./routes/contactRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/contact', contactRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
  })
})

module.exports = app
