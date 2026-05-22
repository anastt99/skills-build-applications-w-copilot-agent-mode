import { useEffect, useState } from 'react'

const codespaceWorkoutsUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`

export default function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = `${apiBase}/api/workouts`
    fetch(url)
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message))
  }, [apiBase])

  return (
    <section>
      <h2>Workouts</h2>
      <p>Codespace API example: {codespaceWorkoutsUrl}</p>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>{workout.name}</li>
        ))}
      </ul>
    </section>
  )
}
