import { Router } from 'express'
import Leaderboard from '../models/leaderboard.ts'

const router = Router()

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find().sort({ score: -1, rank: 1 })
  res.json(entries)
})

router.post('/', async (req, res) => {
  const { entityType, entityId, name, score, rank } = req.body
  const entry = new Leaderboard({
    entityType: entityType || 'User',
    entityId,
    name: name || 'Unknown',
    score: Number(score) || 0,
    rank: Number(rank) || 1
  })

  await entry.save()
  res.status(201).json(entry)
})

export default router
