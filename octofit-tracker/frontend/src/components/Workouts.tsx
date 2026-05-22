import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api.ts'

type Workout = {
  _id?: string
  title?: string
  category?: string
  duration?: number
  difficulty?: string
  description?: string
}

interface Props {
  apiBase: string
}

export default function Workouts({ apiBase }: Props) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(buildApiUrl('workouts'))
        if (!response.ok) {
          throw new Error(`Status ${response.status}`)
        }
        const body = await response.json()
        setWorkouts(normalizeApiResponse(body) as Workout[])
      } catch (err) {
        setError(String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [apiBase])

  return (
    <section>
      <h2>Workouts</h2>
      <p className="page-note">
        Fetching workouts from <code>{apiBase}/api/workouts</code>
      </p>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">Unable to load workouts: {error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id ?? workout.title ?? Math.random()}>
                <td>{workout.title || 'Untitled'}</td>
                <td>{workout.category || 'General'}</td>
                <td>{workout.duration ?? '—'} min</td>
                <td>{workout.difficulty || 'easy'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
