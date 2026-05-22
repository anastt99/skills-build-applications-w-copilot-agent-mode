import { connectDatabase, disconnectDatabase, MONGO_URI } from '../database.ts'
import Activity from '../models/activity.ts'
import Leaderboard from '../models/leaderboard.ts'
import Team from '../models/team.ts'
import User from '../models/user.ts'
import Workout from '../models/workout.ts'

// Seed the octofit_db database with test data
async function seedDatabase() {
  console.log('Seed the octofit_db database with test data')
  console.log('Using MongoDB URI:', MONGO_URI)

  await connectDatabase()

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  const users = await User.create([
    { name: 'Alex Mercer', email: 'alex.mercer@octofit.com', role: 'athlete', avatarUrl: 'https://example.com/avatars/alex.png' },
    { name: 'Mia Santos', email: 'mia.santos@octofit.com', role: 'coach', avatarUrl: 'https://example.com/avatars/mia.png' },
    { name: 'Jordan Lee', email: 'jordan.lee@octofit.com', role: 'athlete', avatarUrl: 'https://example.com/avatars/jordan.png' }
  ])

  const teams = await Team.create([
    {
      name: 'Octo Runners',
      description: 'A fast-paced endurance team for morning runners.',
      members: [users[0]._id, users[2]._id],
      score: 4820
    },
    {
      name: 'Core Crushers',
      description: 'Strength and mobility specialists who train together daily.',
      members: [users[1]._id],
      score: 4210
    }
  ])

  const workouts = await Workout.create([
    {
      title: 'Sunrise Interval Run',
      category: 'cardio',
      duration: 35,
      difficulty: 'high',
      description: 'A mix of sprints and recovery jogs to build speed.'
    },
    {
      title: 'Total Body Strength',
      category: 'strength',
      duration: 45,
      difficulty: 'medium',
      description: 'A balanced resistance workout for all major muscle groups.'
    },
    {
      title: 'Recovery Yoga Flow',
      category: 'flexibility',
      duration: 30,
      difficulty: 'easy',
      description: 'A gentle yoga flow to improve mobility and recovery.'
    }
  ])

  const activities = await Activity.create([
    {
      userId: users[0]._id,
      type: 'Run',
      duration: 42,
      distance: 8.2,
      calories: 580,
      date: new Date('2026-05-18T07:15:00Z')
    },
    {
      userId: users[2]._id,
      type: 'Cycling',
      duration: 60,
      distance: 22.4,
      calories: 720,
      date: new Date('2026-05-19T17:10:00Z')
    },
    {
      userId: users[1]._id,
      type: 'Yoga',
      duration: 30,
      distance: 0,
      calories: 180,
      date: new Date('2026-05-20T12:00:00Z')
    }
  ])

  await Leaderboard.create([
    { entityType: 'User', entityId: users[0]._id, name: users[0].name, score: 1240, rank: 1 },
    { entityType: 'User', entityId: users[2]._id, name: users[2].name, score: 1120, rank: 2 },
    { entityType: 'Team', entityId: teams[0]._id, name: teams[0].name, score: teams[0].score, rank: 1 },
    { entityType: 'Team', entityId: teams[1]._id, name: teams[1].name, score: teams[1].score, rank: 2 }
  ])

  console.log('Seed complete:')
  console.log(`  users: ${users.length}`)
  console.log(`  teams: ${teams.length}`)
  console.log(`  workouts: ${workouts.length}`)
  console.log(`  activities: ${activities.length}`)
  console.log('  leaderboard entries: 4')

  await disconnectDatabase()
}

seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
