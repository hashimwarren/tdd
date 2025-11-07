import { describe, it, expect } from 'vitest'
import { requireAuth, requireRole } from '@/lib/auth-middleware'

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

describe('requireRole', () => {
  it('throws error when user role does not match required role', () => {
    // Arrange: Employee session trying to access HR route
    const employeeSession = {
      user: {
        id: '456',
        email: 'employee@example.com',
        role: 'employee'
      }
    }
    const requiredRole = 'hr_manager'

    // Act & Assert: Should throw authorization error
    expect(() => requireRole(employeeSession, requiredRole)).toThrow()
    expect(() => requireRole(employeeSession, requiredRole))
      .toThrow(/unauthorized|forbidden|insufficient permissions/i)
  })

  it('does not throw when user role matches required role', () => {
    // Arrange: HR manager session accessing HR route
    const hrManagerSession = {
      user: {
        id: '789',
        email: 'hr@example.com',
        role: 'hr_manager'
      }
    }
    const requiredRole = 'hr_manager'

    // Act & Assert: Should not throw any error
    expect(() => requireRole(hrManagerSession, requiredRole)).not.toThrow()
  })
})
