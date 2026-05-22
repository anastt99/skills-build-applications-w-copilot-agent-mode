import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number, default: 0 },
    calories: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  { timestamps: true }
)

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)
export default Activity
