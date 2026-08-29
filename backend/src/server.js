const app = require('./app')
const connectDB = require('./config/db')

const preferredPort = Number(process.env.PORT) || 5002

const startServer = async () => {
  try {
    await connectDB()
  } catch (error) {
    console.warn('Database startup check failed, continuing without DB:', error.message)
  }

  const startOnPort = (port) => {
    const server = app.listen(port, () => {
      console.log(`Backend server running on http://localhost:${port}`)
    })

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        const nextPort = port + 1
        console.warn(`Port ${port} is busy. Retrying on ${nextPort}...`)
        startOnPort(nextPort)
        return
      }

      throw error
    })
  }

  startOnPort(preferredPort)
}

startServer()
