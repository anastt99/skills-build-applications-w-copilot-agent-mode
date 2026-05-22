import { Router } from 'express'
import Workout from '../models/workout.ts'

const router = Router()

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().sort({ title: 1 })
  res.json(workouts)
})

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id)
  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' })
  }
  res.json(workout)
})

router.post('/', async (req, res) => {
  const { title, category, duration, difficulty, description } = req.body
  const workout = new Workout({
    title: title || 'New Workout',
    category: category || 'general',
    duration: Number(duration) || 0,
    difficulty: difficulty || 'easy',
    description: description || ''
  })

  await workout.save()
  res.status(201).json(workout)
})

export default router
