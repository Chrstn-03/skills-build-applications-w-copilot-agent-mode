import express, { Router } from 'express'
import { Activity } from '../models/Activity.js'

const router = Router()

// GET /api/activities/ - List all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('userId')
    res.json({ message: 'List all activities', activities })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' })
  }
})

// POST /api/activities/ - Log new activity
router.post('/', async (req, res) => {
  try {
    const newActivity = await Activity.create(req.body)
    res.status(201).json({ message: 'Activity logged', activity: newActivity })
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity' })
  }
})

// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId')
    if (!activity) return res.status(404).json({ error: 'Activity not found' })
    res.json({ message: `Get activity ${req.params.id}`, activity })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' })
  }
})

// PUT /api/activities/:id - Update activity
router.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!activity) return res.status(404).json({ error: 'Activity not found' })
    res.json({ message: `Activity ${req.params.id} updated`, activity })
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' })
  }
})

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id)
    if (!activity) return res.status(404).json({ error: 'Activity not found' })
    res.json({ message: `Activity ${req.params.id} deleted`, activity })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' })
  }
})

export default router
