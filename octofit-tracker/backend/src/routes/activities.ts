import { Router } from 'express'
import Activity from '../models/activity.ts'

const router = Router()

router.get('/', async (_req, res) => {
  const activities = await Activity.find().sort({ date: -1 })
  res.json(activities)
})

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id)
  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' })
  }
  res.json(activity)
})

router.post('/', async (req, res) => {
  const { userId, type, duration, distance, calories, date } = req.body
  const activity = new Activity({
    userId,
    type: type || 'workout',
    duration: Number(duration) || 0,
    distance: Number(distance) || 0,
    calories: Number(calories) || 0,
    date: date ? new Date(date) : new Date()
  })

  await activity.save()
  res.status(201).json(activity)
})

export default router
