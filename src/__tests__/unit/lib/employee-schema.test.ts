import { describe, it, expect } from 'vitest'
import { employeeSchema } from '@/lib/schemas/employee'

describe('employeeSchema', () => {
  describe('valid employee data', () => {
    it('accepts valid employee with all required fields', () => {
      // Arrange: Create valid employee data with all required fields
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should return the parsed employee object
      expect(result).toEqual(validEmployee)
      expect(result.id).toBe('550e8400-e29b-41d4-a716-446655440000')
      expect(result.firstName).toBe('John')
      expect(result.lastName).toBe('Doe')
      expect(result.email).toBe('john.doe@example.com')
      expect(result.role).toBe('employee')
    })

    it('accepts valid employee with all fields including optional ones', () => {
      // Arrange: Create valid employee data with optional fields
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'hr_manager' as const,
        department: 'Human Resources',
        phoneNumber: '+1-555-123-4567',
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should return the parsed employee object with all fields
      expect(result).toEqual(validEmployee)
      expect(result.department).toBe('Human Resources')
      expect(result.phoneNumber).toBe('+1-555-123-4567')
    })

    it('accepts employee without optional fields', () => {
      // Arrange: Create valid employee without optional fields
      const validEmployee = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        role: 'admin' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should return the parsed employee object
      expect(result).toEqual(validEmployee)
      expect(result.department).toBeUndefined()
      expect(result.phoneNumber).toBeUndefined()
    })
  })

  describe('email validation', () => {
    it('rejects invalid email format with clear error message', () => {
      // Arrange: Create employee with invalid email
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'not-an-email',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error with message about invalid email
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        expect(error.issues[0].path).toContain('email')
        expect(error.issues[0].message).toMatch(/email|invalid/i)
      }
    })

    it('rejects email without @ symbol', () => {
      // Arrange: Create employee with email missing @ symbol
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe.example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error for invalid email format
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
    })

    it('rejects email without domain', () => {
      // Arrange: Create employee with email without domain
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error for invalid email format
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
    })
  })

  describe('required fields validation', () => {
    it('rejects missing id field with clear error message', () => {
      // Arrange: Create employee without id
      const invalidEmployee = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error with message about missing id
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        expect(error.issues[0].path).toContain('id')
        expect(error.issues[0].message).toMatch(/required/i)
      }
    })

    it('rejects missing firstName field with clear error message', () => {
      // Arrange: Create employee without firstName
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error with message about missing firstName
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const firstNameError = error.issues.find((issue: any) => issue.path.includes('firstName'))
        expect(firstNameError).toBeDefined()
        expect(firstNameError.message).toMatch(/required/i)
      }
    })

    it('rejects missing lastName field with clear error message', () => {
      // Arrange: Create employee without lastName
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error with message about missing lastName
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const lastNameError = error.issues.find((issue: any) => issue.path.includes('lastName'))
        expect(lastNameError).toBeDefined()
        expect(lastNameError.message).toMatch(/required/i)
      }
    })

    it('rejects missing email field with clear error message', () => {
      // Arrange: Create employee without email
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error with message about missing email
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const emailError = error.issues.find((issue: any) => issue.path.includes('email'))
        expect(emailError).toBeDefined()
        expect(emailError.message).toMatch(/required/i)
      }
    })

    it('rejects missing role field with clear error message', () => {
      // Arrange: Create employee without role
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      }

      // Act & Assert: Should throw error with message about missing role
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const roleError = error.issues.find((issue: any) => issue.path.includes('role'))
        expect(roleError).toBeDefined()
        expect(roleError.message).toMatch(/required/i)
      }
    })
  })

  describe('role enum validation', () => {
    it('accepts employee role', () => {
      // Arrange: Create employee with employee role
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should accept employee role
      expect(result.role).toBe('employee')
    })

    it('accepts hr_manager role', () => {
      // Arrange: Create employee with hr_manager role
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'hr_manager' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should accept hr_manager role
      expect(result.role).toBe('hr_manager')
    })

    it('accepts admin role', () => {
      // Arrange: Create employee with admin role
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        role: 'admin' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should accept admin role
      expect(result.role).toBe('admin')
    })

    it('rejects invalid role value with clear error message', () => {
      // Arrange: Create employee with invalid role
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'superuser',
      }

      // Act & Assert: Should throw error with message about invalid role
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const roleError = error.issues.find((issue: any) => issue.path.includes('role'))
        expect(roleError).toBeDefined()
        expect(roleError.message).toMatch(/invalid|enum|expected/i)
      }
    })

    it('rejects numeric role value', () => {
      // Arrange: Create employee with numeric role
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 123,
      }

      // Act & Assert: Should throw error for invalid role type
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
    })
  })

  describe('field length constraints', () => {
    it('rejects firstName with empty string', () => {
      // Arrange: Create employee with empty firstName
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: '',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error for empty firstName
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const firstNameError = error.issues.find((issue: any) => issue.path.includes('firstName'))
        expect(firstNameError).toBeDefined()
        expect(firstNameError.message).toMatch(/string|at least|minimum/i)
      }
    })

    it('rejects firstName longer than 100 characters', () => {
      // Arrange: Create employee with firstName exceeding 100 chars
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'A'.repeat(101),
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error for firstName too long
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const firstNameError = error.issues.find((issue: any) => issue.path.includes('firstName'))
        expect(firstNameError).toBeDefined()
        expect(firstNameError.message).toMatch(/at most|maximum|100/i)
      }
    })

    it('accepts firstName with exactly 100 characters', () => {
      // Arrange: Create employee with firstName of exactly 100 chars
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'A'.repeat(100),
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should accept firstName with exactly 100 characters
      expect(result.firstName).toHaveLength(100)
    })

    it('rejects lastName with empty string', () => {
      // Arrange: Create employee with empty lastName
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: '',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error for empty lastName
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const lastNameError = error.issues.find((issue: any) => issue.path.includes('lastName'))
        expect(lastNameError).toBeDefined()
        expect(lastNameError.message).toMatch(/string|at least|minimum/i)
      }
    })

    it('rejects lastName longer than 100 characters', () => {
      // Arrange: Create employee with lastName exceeding 100 chars
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'D'.repeat(101),
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error for lastName too long
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const lastNameError = error.issues.find((issue: any) => issue.path.includes('lastName'))
        expect(lastNameError).toBeDefined()
        expect(lastNameError.message).toMatch(/at most|maximum|100/i)
      }
    })

    it('accepts lastName with exactly 100 characters', () => {
      // Arrange: Create employee with lastName of exactly 100 chars
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'D'.repeat(100),
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should accept lastName with exactly 100 characters
      expect(result.lastName).toHaveLength(100)
    })

    it('rejects department longer than 100 characters', () => {
      // Arrange: Create employee with department exceeding 100 chars
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
        department: 'D'.repeat(101),
      }

      // Act & Assert: Should throw error for department too long
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const departmentError = error.issues.find((issue: any) => issue.path.includes('department'))
        expect(departmentError).toBeDefined()
        expect(departmentError.message).toMatch(/at most|maximum|100/i)
      }
    })

    it('accepts department with exactly 100 characters', () => {
      // Arrange: Create employee with department of exactly 100 chars
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
        department: 'D'.repeat(100),
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should accept department with exactly 100 characters
      expect(result.department).toHaveLength(100)
    })
  })

  describe('UUID validation', () => {
    it('rejects invalid UUID format', () => {
      // Arrange: Create employee with invalid UUID
      const invalidEmployee = {
        id: 'not-a-valid-uuid',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error for invalid UUID format
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const idError = error.issues.find((issue: any) => issue.path.includes('id'))
        expect(idError).toBeDefined()
        expect(idError.message).toMatch(/uuid|invalid/i)
      }
    })

    it('rejects UUID with incorrect format (missing dashes)', () => {
      // Arrange: Create employee with UUID missing dashes
      const invalidEmployee = {
        id: '550e8400e29b41d4a716446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error for malformed UUID
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
    })

    it('rejects numeric id instead of UUID', () => {
      // Arrange: Create employee with numeric id
      const invalidEmployee = {
        id: 12345,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act & Assert: Should throw error for non-string id
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
    })

    it('accepts valid UUID v4 format', () => {
      // Arrange: Create employee with valid UUID v4
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should accept valid UUID format
      expect(result.id).toBe('550e8400-e29b-41d4-a716-446655440000')
    })
  })

  describe('optional fields validation', () => {
    it('allows department to be omitted', () => {
      // Arrange: Create employee without department
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should successfully parse without department
      expect(result).toBeDefined()
      expect(result.department).toBeUndefined()
    })

    it('allows phoneNumber to be omitted', () => {
      // Arrange: Create employee without phoneNumber
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should successfully parse without phoneNumber
      expect(result).toBeDefined()
      expect(result.phoneNumber).toBeUndefined()
    })

    it('allows both optional fields to be omitted', () => {
      // Arrange: Create employee without any optional fields
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should successfully parse without optional fields
      expect(result).toBeDefined()
      expect(result.department).toBeUndefined()
      expect(result.phoneNumber).toBeUndefined()
    })
  })

  describe('phone number validation', () => {
    it('accepts valid phone number with country code', () => {
      // Arrange: Create employee with valid international phone number
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
        phoneNumber: '+1-555-123-4567',
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should accept valid phone number format
      expect(result.phoneNumber).toBe('+1-555-123-4567')
    })

    it('accepts valid phone number without dashes', () => {
      // Arrange: Create employee with phone number without dashes
      const validEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
        phoneNumber: '+15551234567',
      }

      // Act: Parse the valid employee data
      const result = employeeSchema.parse(validEmployee)

      // Assert: Should accept phone number without dashes
      expect(result.phoneNumber).toBe('+15551234567')
    })

    it('rejects invalid phone number format', () => {
      // Arrange: Create employee with invalid phone number
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
        phoneNumber: 'not-a-phone',
      }

      // Act & Assert: Should throw error for invalid phone format
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
      
      try {
        employeeSchema.parse(invalidEmployee)
      } catch (error: any) {
        expect(error.issues).toBeDefined()
        const phoneError = error.issues.find((issue: any) => issue.path.includes('phoneNumber'))
        expect(phoneError).toBeDefined()
        expect(phoneError.message).toMatch(/phone|invalid|format/i)
      }
    })

    it('rejects phone number with only letters', () => {
      // Arrange: Create employee with alphabetic phone number
      const invalidEmployee = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'employee' as const,
        phoneNumber: 'abcdefghij',
      }

      // Act & Assert: Should throw error for non-numeric phone
      expect(() => employeeSchema.parse(invalidEmployee)).toThrow()
    })
  })
})
