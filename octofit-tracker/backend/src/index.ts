import express from 'express'
import mongoose from 'mongoose'

const PORT = Number(process.env.PORT ?? 8000)
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit'

const app = express()
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', port: PORT })
})

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log(`Connected to MongoDB at ${MONGO_URI}`)

    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

start()
