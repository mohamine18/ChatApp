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

export const logInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be string',
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

export type logInType = z.infer<typeof logInSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address' }),
});

export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string',
      })
      .min(6, { message: 'Must be 6 or more characters long' })
      .max(16, { message: 'Must be 16 or fewer characters long' }),
    confirmPassword: z
      .string({
        required_error: 'Confirm password is required',
        invalid_type_error: 'Confirm password must be a string',
      })
      .min(6, { message: 'Must be 6 or more characters long' })
      .max(16, { message: 'Must be 16 or fewer characters long' }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: 'Password do not match', path: ['confirmPassword'] }
  );

export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
