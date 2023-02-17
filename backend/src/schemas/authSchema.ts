import z from 'zod';

export const signUpSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(3, { message: 'Must be 3 or more characters long' })
    .trim(),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(3, { message: 'Must be 3 or more characters long' })
    .trim(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .min(6, { message: 'Must be 6 or more characters long' })
    .max(16, { message: 'Must be 16 or fewer characters long' }),
});

export type signUpType = z.infer<typeof signUpSchema>;
