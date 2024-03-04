'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schema';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { getUserByEmail } from '@/lib/user';

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validated_data = RegisterSchema.safeParse(data);

    if (!validated_data.success) {
        return { error: 'Invalid data. Try again.' };
    }

    const { name, email, password } = validated_data.data;
    const hashed_password = await hash(password, 10);
    const email_exists = await getUserByEmail(email);

    if (email_exists) {
        return { error: 'Email already exists.' };
    }

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashed_password,
            },
        });

        //@todo: send email confirmation token

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    } catch (error) {
        console.error(error);
        return { error: 'Something went wrong. Try again.' };
    }
};
