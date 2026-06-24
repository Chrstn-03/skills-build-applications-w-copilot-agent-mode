import { Schema, model, Types } from 'mongoose'

interface ILeaderboardEntry {
  userId: Types.ObjectId
  teamId?: Types.ObjectId
  rank: number
  totalPoints: number
  totalMinutes: number
  updatedAt: Date
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    rank: { type: Number, required: true },
    totalPoints: { type: Number, default: 0 },
    totalMinutes: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema)
