import mongoose from 'mongoose'
import { User } from '../models/User.js'
import { Team } from '../models/Team.js'
import { Activity } from '../models/Activity.js'
import { Leaderboard } from '../models/Leaderboard.js'
import { Workout } from '../models/Workout.js'

/**
 * Seed the octofit_db database with test data
 */

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log(`Connected to MongoDB at ${MONGO_URI}`)

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ])
    console.log('Cleared existing data')

    // Create users
    const users = await User.create([
      {
        username: 'alice_runner',
        email: 'alice@example.com',
        password: 'hashed_password_1',
        displayName: 'Alice',
        totalActivityMinutes: 450
      },
      {
        username: 'bob_cyclist',
        email: 'bob@example.com',
        password: 'hashed_password_2',
        displayName: 'Bob',
        totalActivityMinutes: 320
      },
      {
        username: 'carol_swimmer',
        email: 'carol@example.com',
        password: 'hashed_password_3',
        displayName: 'Carol',
        totalActivityMinutes: 280
      },
      {
        username: 'dave_yogi',
        email: 'dave@example.com',
        password: 'hashed_password_4',
        displayName: 'Dave',
        totalActivityMinutes: 150
      }
    ])
    console.log(`Created ${users.length} users`)

    // Create teams
    const teams = await Team.create([
      {
        name: 'Morning Warriors',
        description: 'Early risers who love fitness',
        members: [users[0]._id.toString(), users[1]._id.toString()],
        totalActivityMinutes: 770
      },
      {
        name: 'Evening Exercisers',
        description: 'Fitness enthusiasts who work out after hours',
        members: [users[2]._id.toString(), users[3]._id.toString()],
        totalActivityMinutes: 430
      }
    ])
    console.log(`Created ${teams.length} teams`)

    // Create activities
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        activityType: 'Running',
        duration: 45,
        calories: 450,
        distance: 5,
        intensity: 'high',
        notes: 'Morning run in the park'
      },
      {
        userId: users[0]._id,
        activityType: 'Running',
        duration: 30,
        calories: 300,
        distance: 3.5,
        intensity: 'moderate',
        notes: 'Evening jog'
      },
      {
        userId: users[1]._id,
        activityType: 'Cycling',
        duration: 60,
        calories: 500,
        distance: 20,
        intensity: 'high',
        notes: 'Outdoor cycling adventure'
      },
      {
        userId: users[2]._id,
        activityType: 'Swimming',
        duration: 40,
        calories: 400,
        distance: 1.5,
        intensity: 'moderate',
        notes: 'Pool laps'
      },
      {
        userId: users[3]._id,
        activityType: 'Yoga',
        duration: 60,
        calories: 150,
        intensity: 'low',
        notes: 'Relaxing vinyasa flow'
      }
    ])
    console.log(`Created ${activities.length} activities`)

    // Create leaderboard entries
    const leaderboard = await Leaderboard.create([
      {
        userId: users[0]._id,
        rank: 1,
        totalPoints: 450,
        totalMinutes: 450
      },
      {
        userId: users[1]._id,
        rank: 2,
        totalPoints: 320,
        totalMinutes: 320
      },
      {
        userId: users[2]._id,
        rank: 3,
        totalPoints: 280,
        totalMinutes: 280
      },
      {
        userId: users[3]._id,
        rank: 4,
        totalPoints: 150,
        totalMinutes: 150
      },
      {
        teamId: teams[0]._id,
        rank: 1,
        totalPoints: 770,
        totalMinutes: 770
      },
      {
        teamId: teams[1]._id,
        rank: 2,
        totalPoints: 430,
        totalMinutes: 430
      }
    ])
    console.log(`Created ${leaderboard.length} leaderboard entries`)

    // Create workouts
    const workouts = await Workout.create([
      {
        userId: users[0]._id,
        name: 'HIIT Sprint Training',
        description: 'High-intensity interval training for cardio',
        exercises: ['Sprint 1min', 'Walk 1min', 'Repeat 5x'],
        duration: 20,
        difficulty: 'advanced'
      },
      {
        userId: users[1]._id,
        name: 'Road Cycling Route',
        description: 'Scenic outdoor cycling path',
        exercises: ['Warm-up', 'Steady pace climb', 'Sprint finish'],
        duration: 60,
        difficulty: 'intermediate'
      },
      {
        userId: users[2]._id,
        name: 'Beginner Swimming',
        description: 'Easy swimming routine for beginners',
        exercises: ['Warm-up laps', 'Freestyle', 'Cool-down'],
        duration: 30,
        difficulty: 'beginner'
      },
      {
        userId: users[3]._id,
        name: 'Relaxation Yoga',
        description: 'Gentle yoga for flexibility',
        exercises: ['Stretch', 'Downward dog', 'Warrior pose', 'Savasana'],
        duration: 60,
        difficulty: 'beginner'
      }
    ])
    console.log(`Created ${workouts.length} workouts`)

    console.log('\n✅ Database seeding completed successfully!')
    console.log(`Total users: ${users.length}`)
    console.log(`Total teams: ${teams.length}`)
    console.log(`Total activities: ${activities.length}`)
    console.log(`Total leaderboard entries: ${leaderboard.length}`)
    console.log(`Total workouts: ${workouts.length}`)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('\nDatabase connection closed')
  }
}

seedDatabase()
