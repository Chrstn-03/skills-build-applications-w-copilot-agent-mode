import express, { Router } from 'express'
import { User } from '../models/User.js'

const router = Router()

// GET /api/users/ - List all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json({ message: 'List all users', users })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// POST /api/users/ - Create new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: 'User created', user })
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' })
  }
})

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ message: `Get user ${req.params.id}`, user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// PUT /api/users/:id - Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ message: `User ${req.params.id} updated`, user })
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' })
  }
})

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ message: `User ${req.params.id} deleted`, user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
