import { describe, it, expect } from 'vitest'
import { requireAuth } from '@/lib/auth-middleware'

describe('requireAuth', () => {
  it('throws error when session is null', () => {
    // Arrange: No session exists (simulated by calling without session context)
    
    // Act & Assert: Function should throw when no authenticated session
    expect(() => requireAuth()).toThrow()
    expect(() => requireAuth()).toThrow(/unauthenticated|authentication required/i)
  })
})
