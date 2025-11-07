export function requireAuth(session?: { user: any } | null) {
  if (!session) {
    throw new Error('Unauthenticated')
  }
  return session.user
}

export function requireRole(
  session: { user: { role: string } },
  requiredRole: string
) {
  if (session.user.role !== requiredRole) {
    throw new Error('Unauthorized: Insufficient permissions')
  }
}
