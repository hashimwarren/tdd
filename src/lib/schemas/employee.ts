import { z } from 'zod'

export const employeeSchema = z.object({
  id: z.string({ required_error: 'ID is required' }).uuid({ message: 'Invalid UUID format' }),
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, { message: 'First name must contain at least 1 character' })
    .max(100, { message: 'First name must contain at most 100 characters' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, { message: 'Last name must contain at least 1 character' })
    .max(100, { message: 'Last name must contain at most 100 characters' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  role: z.enum(['employee', 'hr_manager', 'admin'], {
    required_error: 'Role is required',
    invalid_type_error: 'Invalid role: expected employee, hr_manager, or admin',
  }),
  department: z
    .string()
    .max(100, { message: 'Department must contain at most 100 characters' })
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^\+\d{1,3}(-?\d{3,4}){2,3}$/, {
      message: 'Invalid phone number format',
    })
    .optional(),
})
