import express, { Router } from 'express'

const router = Router()

// GET /api/users/ - List all users
router.get('/', (req, res) => {
  res.json({ message: 'List all users', users: [] })
})

// POST /api/users/ - Create new user
router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created', user: req.body })
})

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}`, userId: req.params.id })
})

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} updated`, user: req.body })
})

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` })
})

export default router
