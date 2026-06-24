import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'

const PORT = Number(process.env.PORT ?? 8000)
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

// Construct Codespaces-aware API URL
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`
  }
  return `http://localhost:${PORT}`
}

const app = express()
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    port: PORT,
    apiUrl: getApiUrl(),
    environment: process.env.CODESPACE_NAME ? 'codespace' : 'local'
  })
})

// Mount route handlers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log(`Connected to MongoDB at ${MONGO_URI}`)

    app.listen(PORT, () => {
      const apiUrl = getApiUrl()
      console.log(`Backend listening on ${apiUrl}`)
      console.log(`Health check: ${apiUrl}/api/health`)
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

start()
