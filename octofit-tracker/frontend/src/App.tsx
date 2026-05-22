import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.tsx'
import Leaderboard from './components/Leaderboard.tsx'
import Teams from './components/Teams.tsx'
import Users from './components/Users.tsx'
import Workouts from './components/Workouts.tsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const hasCodespace = typeof codespaceName === 'string' && codespaceName.trim().length > 0
const apiBase = hasCodespace
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>OctoFit Tracker</h1>
          <p>
            Use <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for
            Codespaces URLs.
          </p>
          <p className="api-note">
            API base: <strong>{apiBase}</strong>
          </p>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
            Users
          </NavLink>
          <NavLink to="/activities" className={({ isActive }) => (isActive ? 'active' : '')}>
            Activities
          </NavLink>
          <NavLink to="/teams" className={({ isActive }) => (isActive ? 'active' : '')}>
            Teams
          </NavLink>
          <NavLink to="/workouts" className={({ isActive }) => (isActive ? 'active' : '')}>
            Workouts
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Leaderboard
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h2>Welcome to OctoFit Tracker</h2>
                <p>
                  This frontend uses Vite environment variables and React Router
                  for navigation. When running in GitHub Codespaces, set
                  <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code>.
                </p>
                <p>
                  If the variable is unset, the app falls back to{' '}
                  <code>http://localhost:8000</code>.
                </p>
              </section>
            }
          />
          <Route path="/users" element={<Users apiBase={apiBase} />} />
          <Route path="/activities" element={<Activities apiBase={apiBase} />} />
          <Route path="/teams" element={<Teams apiBase={apiBase} />} />
          <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
