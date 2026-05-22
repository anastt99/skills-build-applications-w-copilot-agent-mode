import { useEffect, useState } from 'react'

const codespaceTeamsUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`

export default function Teams({ apiBase }) {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = `${apiBase}/api/teams`
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((err) => setError(err.message))
  }, [apiBase])

  return (
    <section>
      <h2>Teams</h2>
      <p>Codespace API example: {codespaceTeamsUrl}</p>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id}>{team.name}</li>
        ))}
      </ul>
    </section>
  )
}
