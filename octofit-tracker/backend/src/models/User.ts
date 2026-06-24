import { Schema, model } from 'mongoose'

interface IUser {
  username: string
  email: string
  password: string
  displayName: string
  profilePicture?: string
  totalActivityMinutes: number
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: { type: String, required: true },
    profilePicture: String,
    totalActivityMinutes: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export const User = model<IUser>('User', userSchema)
