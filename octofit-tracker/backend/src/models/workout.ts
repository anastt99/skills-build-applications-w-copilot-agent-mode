import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true, enum: ['easy', 'medium', 'high'] },
    description: { type: String, default: '' }
  },
  { timestamps: true }
)

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)
export default Workout
