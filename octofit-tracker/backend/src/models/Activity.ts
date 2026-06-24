import { Schema, model, Types } from 'mongoose'

interface IActivity {
  userId: Types.ObjectId
  activityType: string
  duration: number
  calories: number
  distance?: number
  intensity: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    distance: Number,
    intensity: { type: String, enum: ['low', 'moderate', 'high'], default: 'moderate' },
    notes: String
  },
  { timestamps: true }
)

export const Activity = model<IActivity>('Activity', activitySchema)
