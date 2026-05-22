import { Router } from 'express'
import User from '../models/user.ts'

const router = Router()

router.get('/', async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
})

router.post('/', async (req, res) => {
  const { name, email, role, avatarUrl } = req.body
  const user = new User({
    name: name || 'New User',
    email: email || `user-${Date.now()}@octofit.com`,
    role: role || 'athlete',
    avatarUrl: avatarUrl || ''
  })

  await user.save()
  res.status(201).json(user)
})

export default router
