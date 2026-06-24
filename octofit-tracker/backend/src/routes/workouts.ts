import express, { Router } from 'express'

const router = Router()

// GET /api/workouts/ - List all workouts
router.get('/', (req, res) => {
  res.json({ message: 'List all workouts', workouts: [] })
})

// POST /api/workouts/ - Create new workout
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Workout created', workout: req.body })
})

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get workout ${req.params.id}`, workoutId: req.params.id })
})

// PUT /api/workouts/:id - Update workout
router.put('/:id', (req, res) => {
  res.json({ message: `Workout ${req.params.id} updated`, workout: req.body })
})

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', (req, res) => {
  res.json({ message: `Workout ${req.params.id} deleted` })
})

export default router
