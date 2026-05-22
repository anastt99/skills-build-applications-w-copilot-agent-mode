import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api.ts'

type LeaderboardEntry = {
  _id?: string
  entityType?: string
  name?: string
  score?: number
  rank?: number
}

interface Props {
  apiBase: string
}

export default function Leaderboard({ apiBase }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(buildApiUrl('leaderboard'))
        if (!response.ok) {
          throw new Error(`Status ${response.status}`)
        }
        const body = await response.json()
        setEntries(normalizeApiResponse(body) as LeaderboardEntry[])
      } catch (err) {
        setError(String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [apiBase])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="page-note">
        Fetching leaderboard from <code>{apiBase}/api/leaderboard</code>
      </p>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">Unable to load leaderboard: {error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Type</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id ?? `${entry.name}-${entry.rank}`}> 
                <td>{entry.rank ?? '-'}</td>
                <td>{entry.name || 'Unknown'}</td>
                <td>{entry.entityType || 'User'}</td>
                <td>{entry.score ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
