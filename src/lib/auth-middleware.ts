export function requireAuth(session?: { user: any } | null) {
  if (!session) {
    throw new Error('Unauthenticated')
  }
  return session.user
}
