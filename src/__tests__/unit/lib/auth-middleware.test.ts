import { describe, it, expect } from 'vitest'
import { requireAuth } from '@/lib/auth-middleware'

describe('requireAuth', () => {
  it('throws error when session is null', () => {
    // Arrange: No session exists (simulated by calling without session context)
    
    // Act & Assert: Function should throw when no authenticated session
    expect(() => requireAuth()).toThrow()
    expect(() => requireAuth()).toThrow(/unauthenticated|authentication required/i)
  })

  it('returns user when valid session exists', () => {
    // Arrange: Create a valid session with user data
    const mockSession = {
      user: {
        id: '123',
        email: 'user@example.com',
        role: 'employee'
      }
    }

    // Act: Call requireAuth with valid session
    const result = requireAuth(mockSession)

    // Assert: Should return the user object
    expect(result).toEqual(mockSession.user)
    expect(result).toHaveProperty('id', '123')
    expect(result).toHaveProperty('email', 'user@example.com')
    expect(result).toHaveProperty('role', 'employee')
  })
})
