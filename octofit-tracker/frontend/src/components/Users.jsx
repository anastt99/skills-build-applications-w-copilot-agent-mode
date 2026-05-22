import { useEffect, useState } from 'react'

const codespaceUsersUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`

export default function Users({ apiBase }) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = `${apiBase}/api/users`
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
  }, [apiBase])

  return (
    <section>
      <h2>Users</h2>
      <p>Codespace API example: {codespaceUsersUrl}</p>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </section>
  )
}
