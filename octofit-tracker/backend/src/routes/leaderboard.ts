import express, { Router } from 'express'
import { Leaderboard } from '../models/Leaderboard.js'

const router = Router()

// GET /api/leaderboard/ - Get global leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId')
      .populate('teamId')
      .sort({ rank: 1 })
    res.json({ message: 'Global leaderboard', leaderboard })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

// GET /api/leaderboard/teams - Get team leaderboard
router.get('/teams', async (req, res) => {
  try {
    const teams = await Leaderboard.find({ teamId: { $exists: true, $ne: null } })
      .populate('teamId')
      .sort({ rank: 1 })
    res.json({ message: 'Team leaderboard', teams })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' })
  }
})

// GET /api/leaderboard/users - Get user leaderboard
router.get('/users', async (req, res) => {
  try {
    const users = await Leaderboard.find({ userId: { $exists: true, $ne: null } })
      .populate('userId')
      .sort({ rank: 1 })
    res.json({ message: 'User leaderboard', users })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user leaderboard' })
  }
})

export default router
