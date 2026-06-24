import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

export const databaseUri = MONGO_URI

export const connectToDatabase = async () => {
  return mongoose.connect(MONGO_URI)
}
