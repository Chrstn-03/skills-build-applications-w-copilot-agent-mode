import { Schema, model } from 'mongoose'

interface ITeam {
  name: string
  description: string
  members: string[]
  totalActivityMinutes: number
  createdAt: Date
  updatedAt: Date
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    members: [String],
    totalActivityMinutes: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export const Team = model<ITeam>('Team', teamSchema)
