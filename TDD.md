# TDD: Employee Schema Validation with Zod

## Goal
Create a Zod schema for employee data validation that enforces type safety, required fields, format constraints, and clear error messages.

## Test List (Next)
- [x] Valid employee data with all fields passes validation
- [x] Invalid email format is rejected with clear error message
- [x] Missing required fields are rejected with clear error messages
- [x] Role enum validation (employee, hr_manager, admin)
- [x] Field length constraints (firstName, lastName, department max 100 chars)
- [x] UUID format validation for id field
- [x] Optional fields handling (department, phoneNumber)
- [x] Phone number format validation

## Edge Cases / Invariants
- id must be valid UUID format (RFC 4122)
- firstName: 1-100 chars (required, non-empty)
- lastName: 1-100 chars (required, non-empty)
- email: valid email format (required)
- role: enum {'employee', 'hr_manager', 'admin'} (required)
- department: max 100 chars (optional, can be omitted)
- phoneNumber: valid phone format (optional, can be omitted)
- Invalid UUID should fail validation
- Empty strings for required fields should fail
- Role values outside enum should fail
- Field length constraints (firstName, lastName, department max 100)
- Optional fields (department, phoneNumber) can be undefined

## Design Notes
- Schema location: `src/lib/schemas/employee.ts`
- Test location: `src/__tests__/unit/lib/employee-schema.test.ts`
- Export schema as `employeeSchema` from `@/lib/schemas/employee`
- Use Zod's built-in validators: `.uuid()`, `.email()`, `.min()`, `.max()`, `.optional()`
- Enum for role: `z.enum(['employee', 'hr_manager', 'admin'])`
- Phone validation: regex or Zod custom refinement
- Follow AAA pattern (Arrange-Act-Assert) in tests
- Use `z.parse()` for validation (throws ZodError on failure)
- Test both success and failure cases with specific error assertions
- Match existing test style from `auth-middleware.test.ts`

## Refactors Queued
- Consider extracting common validation patterns (UUID, email) to reusable validators
- Add phone number format validation helper if needed
- Consider builder pattern for test data generation

## Done (Green)
<!-- Tests will be appended here with timestamps as they pass -->

### RED Phase Complete - 2025-11-08T00:12:00Z
Created comprehensive failing tests in `src/__tests__/unit/lib/employee-schema.test.ts`:
- ✅ 3 tests for valid employee data scenarios (all required fields, with optional fields, without optional fields)
- ✅ 4 tests for email validation (invalid format, missing @, missing domain)
- ✅ 5 tests for required fields validation (id, firstName, lastName, email, role)
- ✅ 5 tests for role enum validation (employee, hr_manager, admin roles + invalid values)
- ✅ 8 tests for field length constraints (firstName, lastName, department min/max)
- ✅ 4 tests for UUID validation (invalid format, missing dashes, numeric id, valid UUID)
- ✅ 3 tests for optional fields validation (department, phoneNumber can be omitted)
- ✅ 4 tests for phone number validation (valid formats, invalid formats)

**Total: 36 failing tests** - All tests fail with expected error: `Failed to resolve import "@/lib/schemas/employee"`

Ready for GREEN phase: Implementation of `src/lib/schemas/employee.ts` with Zod schema.

### GREEN Phase Complete - 2025-11-08T00:15:00Z
Implemented minimal `src/lib/schemas/employee.ts` schema to make all 35 tests pass:
- ✅ Created `employeeSchema` with Zod validation
- ✅ Required fields: id (UUID), firstName (1-100 chars), lastName (1-100 chars), email (valid format), role (enum)
- ✅ Optional fields: department (max 100 chars), phoneNumber (phone format regex)
- ✅ Clear error messages for all validation failures
- ✅ All 35 tests passing (100% pass rate)
- ✅ All existing tests still passing (no regressions)

**Implementation details:**
- Used Zod's `.uuid()`, `.email()`, `.min()`, `.max()`, `.optional()` validators
- Role enum: `z.enum(['employee', 'hr_manager', 'admin'])`
- Phone regex: `^\+\d{1,3}(-?\d{3,4}){2,3}$` to match international formats
- Custom error messages aligned with test expectations

Ready for REFACTOR phase or next RED cycle.
