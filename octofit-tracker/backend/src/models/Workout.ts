import { Schema, model, Types } from 'mongoose'

interface IWorkout {
  userId: Types.ObjectId
  name: string
  description: string
  exercises: string[]
  duration: number
  difficulty: string
  createdAt: Date
  updatedAt: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    exercises: [String],
    duration: { type: Number, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' }
  },
  { timestamps: true }
)

export const Workout = model<IWorkout>('Workout', workoutSchema)
