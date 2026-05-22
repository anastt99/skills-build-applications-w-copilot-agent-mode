import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import activitiesRouter from './routes/activities.ts'
import leaderboardRouter from './routes/leaderboard.ts'
import teamsRouter from './routes/teams.ts'
import usersRouter from './routes/users.ts'
import workoutsRouter from './routes/workouts.ts'

const app = express()
const PORT = Number(process.env.PORT || 8000)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'
const codespace = process.env.CODESPACE_NAME
const PUBLIC_API_URL = codespace
  ? `https://${codespace}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/config', (_req, res) => {
  res.json({ apiUrl: PUBLIC_API_URL, port: PORT, codespace: codespace || null })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB at', MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Backend listening at http://localhost:${PORT}`)
      console.log(`Codespaces-aware API URL: ${PUBLIC_API_URL}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error)
    process.exit(1)
  })
