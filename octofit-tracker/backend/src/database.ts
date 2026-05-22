import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

async function connectDatabase() {
  console.log('Connecting to MongoDB at', MONGO_URI)
  await mongoose.connect(MONGO_URI)
  return mongoose
}

async function disconnectDatabase() {
  await mongoose.disconnect()
}

export { connectDatabase, disconnectDatabase, MONGO_URI, mongoose }
