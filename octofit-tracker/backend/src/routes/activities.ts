import express, { Router } from 'express'

const router = Router()

// GET /api/activities/ - List all activities
router.get('/', (req, res) => {
  res.json({ message: 'List all activities', activities: [] })
})

// POST /api/activities/ - Log new activity
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Activity logged', activity: req.body })
})

// GET /api/activities/:id - Get activity by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get activity ${req.params.id}`, activityId: req.params.id })
})

// PUT /api/activities/:id - Update activity
router.put('/:id', (req, res) => {
  res.json({ message: `Activity ${req.params.id} updated`, activity: req.body })
})

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', (req, res) => {
  res.json({ message: `Activity ${req.params.id} deleted` })
})

export default router
