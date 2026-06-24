import express, { Router } from 'express'

const router = Router()

// GET /api/leaderboard/ - Get global leaderboard
router.get('/', (req, res) => {
  res.json({ message: 'Global leaderboard', leaderboard: [] })
})

// GET /api/leaderboard/teams - Get team leaderboard
router.get('/teams', (req, res) => {
  res.json({ message: 'Team leaderboard', teams: [] })
})

// GET /api/leaderboard/users - Get user leaderboard
router.get('/users', (req, res) => {
  res.json({ message: 'User leaderboard', users: [] })
})

export default router
