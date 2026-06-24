import express, { Router } from 'express'

const router = Router()

// GET /api/teams/ - List all teams
router.get('/', (req, res) => {
  res.json({ message: 'List all teams', teams: [] })
})

// POST /api/teams/ - Create new team
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Team created', team: req.body })
})

// GET /api/teams/:id - Get team by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get team ${req.params.id}`, teamId: req.params.id })
})

// PUT /api/teams/:id - Update team
router.put('/:id', (req, res) => {
  res.json({ message: `Team ${req.params.id} updated`, team: req.body })
})

// DELETE /api/teams/:id - Delete team
router.delete('/:id', (req, res) => {
  res.json({ message: `Team ${req.params.id} deleted` })
})

export default router
