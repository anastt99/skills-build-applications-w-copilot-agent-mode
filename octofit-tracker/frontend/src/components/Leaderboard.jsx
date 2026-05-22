import { useEffect, useState } from 'react'

const codespaceLeaderboardUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`

export default function Leaderboard({ apiBase }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = `${apiBase}/api/leaderboard`
    fetch(url)
      .then((response) => response.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => setError(err.message))
  }, [apiBase])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Codespace API example: {codespaceLeaderboardUrl}</p>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry._id}>{entry.user}: {entry.score}</li>
        ))}
      </ul>
    </section>
  )
}
