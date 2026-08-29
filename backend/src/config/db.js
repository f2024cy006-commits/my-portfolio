const mongoose = require('mongoose')

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'

  if (!process.env.MONGODB_URI) {
    console.log('No MONGODB_URI found. Using default local URI. MongoDB is optional for local app startup.')
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    })
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.warn('MongoDB connection failed. Starting app without database connection:', error.message)
  }
}

module.exports = connectDB
