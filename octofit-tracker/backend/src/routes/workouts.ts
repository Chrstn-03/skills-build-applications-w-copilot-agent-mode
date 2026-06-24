import express, { Router } from 'express'
import { Workout } from '../models/Workout.js'

const router = Router()

// GET /api/workouts/ - List all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().populate('userId')
    res.json({ message: 'List all workouts', workouts })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' })
  }
})

// POST /api/workouts/ - Create new workout
router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body)
    res.status(201).json({ message: 'Workout created', workout })
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' })
  }
})

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId')
    if (!workout) return res.status(404).json({ error: 'Workout not found' })
    res.json({ message: `Get workout ${req.params.id}`, workout })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' })
  }
})

// PUT /api/workouts/:id - Update workout
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!workout) return res.status(404).json({ error: 'Workout not found' })
    res.json({ message: `Workout ${req.params.id} updated`, workout })
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' })
  }
})

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id)
    if (!workout) return res.status(404).json({ error: 'Workout not found' })
    res.json({ message: `Workout ${req.params.id} deleted`, workout })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' })
  }
})

export default router
