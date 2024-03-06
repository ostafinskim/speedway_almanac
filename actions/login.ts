'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schema';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validatedData = LoginSchema.safeParse(data);

    if (!validatedData.success) {
        return { error: 'Invalid data. Try again.' };
    }
    const { email, password } = validatedData.data;

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' };
                default:
                    return { error: 'Something went wrong!' };
            }
        }
        throw error;
    }
};
