'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schema';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { getUserByEmail } from '@/lib/user';

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validatedData = RegisterSchema.safeParse(data);

    if (!validatedData.success) {
        return { error: 'Invalid data. Try again.' };
    }

    const { name, email, password } = validatedData.data;
    const hashedPassword = await hash(password, 10);
    const emailExists = await getUserByEmail(email);

    if (emailExists) {
        return { error: 'Email already exists.' };
    }

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
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
