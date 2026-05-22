import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api.ts'

type Team = {
  _id?: string
  name?: string
  description?: string
  members?: string[]
  score?: number
}

interface Props {
  apiBase: string
}

export default function Teams({ apiBase }: Props) {
  const [teams, setTeams] = useState<Team[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(buildApiUrl('teams'))
        if (!response.ok) {
          throw new Error(`Status ${response.status}`)
        }
        const body = await response.json()
        setTeams(normalizeApiResponse(body) as Team[])
      } catch (err) {
        setError(String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [apiBase])

  return (
    <section>
      <h2>Teams</h2>
      <p className="page-note">
        Fetching teams from <code>{apiBase}/api/teams</code>
      </p>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">Unable to load teams: {error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id ?? team.name ?? Math.random()}>
                <td>{team.name || 'Unknown'}</td>
                <td>{team.description || 'No description'}</td>
                <td>{team.members?.length ?? 0}</td>
                <td>{team.score ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
