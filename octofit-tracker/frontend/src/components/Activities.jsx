import { useEffect, useState } from 'react'

const codespaceActivitiesUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`

export default function Activities({ apiBase }) {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = `${apiBase}/api/activities`
    fetch(url)
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((err) => setError(err.message))
  }, [apiBase])

  return (
    <section>
      <h2>Activities</h2>
      <p>Codespace API example: {codespaceActivitiesUrl}</p>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>{activity.type}</li>
        ))}
      </ul>
    </section>
  )
}
