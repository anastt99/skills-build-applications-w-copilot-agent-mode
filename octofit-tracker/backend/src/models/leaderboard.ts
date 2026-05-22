import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema(
  {
    entityType: { type: String, required: true, enum: ['User', 'Team'] },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'entityType' },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true }
  },
  { timestamps: true }
)

const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)
export default Leaderboard
