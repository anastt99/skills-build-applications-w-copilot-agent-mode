const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function buildApiUrl(endpoint: string) {
  return `${apiBase}/api/${endpoint}`
}

export function normalizeApiResponse(response: unknown) {
  if (Array.isArray(response)) {
    return response
  }

  if (response && typeof response === 'object') {
    const body = response as Record<string, unknown>

    const arrayKeys = ['data', 'items', 'results', 'users', 'teams', 'activities', 'workouts', 'leaderboard']
    for (const key of arrayKeys) {
      const value = body[key]
      if (Array.isArray(value)) {
        return value
      }
    }
  }

  return []
}
