import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api.ts'

type Activity = {
  _id?: string
  type?: string
  duration?: number
  distance?: number
  calories?: number
  date?: string
}

interface Props {
  apiBase: string
}

export default function Activities({ apiBase }: Props) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(buildApiUrl('activities'))
        if (!response.ok) {
          throw new Error(`Status ${response.status}`)
        }
        const body = await response.json()
        setActivities(normalizeApiResponse(body) as Activity[])
      } catch (err) {
        setError(String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [apiBase])

  return (
    <section>
      <h2>Activities</h2>
      <p className="page-note">
        Fetching activities from <code>{apiBase}/api/activities</code>
      </p>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">Unable to load activities: {error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? activity.date ?? Math.random()}>
                <td>{activity.type || 'Unknown'}</td>
                <td>{activity.duration ?? '—'} min</td>
                <td>{activity.distance ?? '—'} km</td>
                <td>{activity.calories ?? '—'}</td>
                <td>{activity.date ? new Date(activity.date).toLocaleString() : 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
