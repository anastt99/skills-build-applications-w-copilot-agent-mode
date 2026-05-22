import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api.ts'

type User = {
  _id?: string
  name?: string
  email?: string
  role?: string
}

interface Props {
  apiBase: string
}

export default function Users({ apiBase }: Props) {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(buildApiUrl('users'))
        if (!response.ok) {
          throw new Error(`Status ${response.status}`)
        }
        const body = await response.json()
        setUsers(normalizeApiResponse(body) as User[])
      } catch (err) {
        setError(String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [apiBase])

  return (
    <section>
      <h2>Users</h2>
      <p className="page-note">
        Fetching users from <code>{apiBase}/api/users</code>
      </p>

      {loading && <p>Loading users…</p>}
      {error && <p className="error">Unable to load users: {error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.email ?? Math.random()}>
                <td>{user.name || 'Unknown'}</td>
                <td>{user.email || 'Unknown'}</td>
                <td>{user.role || 'athlete'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
