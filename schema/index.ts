import { z, TypeOf } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Password is required.',
    }),
});

export const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: 'Name is required.',
    }),
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Password is required.',
    }),
    passwordConfirmation: z.string().min(6, {
        message: 'Please confirm your password.',
    }),
});

export type LoginInput = TypeOf<typeof LoginSchema>;
export type RegisterInput = TypeOf<typeof RegisterSchema>;
