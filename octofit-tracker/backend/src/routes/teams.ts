import { Router } from 'express'
import Team from '../models/team.ts'

const router = Router()

router.get('/', async (_req, res) => {
  const teams = await Team.find().sort({ score: -1 })
  res.json(teams)
})

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members')
  if (!team) {
    return res.status(404).json({ error: 'Team not found' })
  }
  res.json(team)
})

router.post('/', async (req, res) => {
  const { name, description, members } = req.body
  const team = new Team({
    name: name || 'New Team',
    description: description || '',
    members: Array.isArray(members) ? members : [],
    score: 0
  })

  await team.save()
  res.status(201).json(team)
})

export default router
