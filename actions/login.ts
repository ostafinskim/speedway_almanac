'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schema';

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validated_data = LoginSchema.safeParse(data);

    if (!validated_data.success) {
        return { error: 'Invalid data. Try again.' };
    }
};
