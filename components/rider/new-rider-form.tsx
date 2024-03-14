'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '../ui/date-picker';
import { CustomFormSelect } from '../ui/form-select';

import countries from '@/lib/countries.json';

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: 'First name must be at least 2 characters long.',
    }),
    lastName: z.string().min(2, {
        message: 'Last name must be at least 2 characters long.',
    }),
    dateOfBirth: z.union([z.date(), z.string()]).refine(
        (date) => {
            if (typeof date === 'string') {
                return new Date(date) < new Date();
            }
            return date < new Date();
        },
        { message: 'Date of birth must be in the past.' }
    ),
    number: z.string().min(2, {
        message: 'Number must be at least 2 characters long.',
    }),
    country: z.string().min(2, {
        message: 'Country must be at least 2 characters long.',
    }),
});

export function NewRiderForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            // this will be a date object from the date picker component, date object when used dropdown, string wen used input
            dateOfBirth: '' || new Date(),
            number: '',
            country: '',
        },
    });
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="max-w-4xl m-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="First name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>e.g. Tomasz</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last name" {...field} />
                                </FormControl>
                                <FormDescription>e.g. Gollob</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between gap-4">
                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Date of birth</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            field={{
                                                onChange: field.onChange,
                                                onBlur: field.onBlur,
                                                value: field.value as
                                                    | string
                                                    | Date,
                                            }}
                                        />
                                    </FormControl>
                                    {/* <FormMessage className='block'/> */}
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel># Starting Number</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={999}
                                        placeholder="Starting number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="capitalize">
                                        Country
                                    </FormLabel>
                                    <CustomFormSelect
                                        name="country"
                                        control={form.control}
                                        labelText="Country"
                                        items={Object.values(countries)}
                                        field={{
                                            onChange: field.onChange,
                                            onBlur: field.onBlur,
                                            value: field.value as string,
                                        }}
                                    />
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
