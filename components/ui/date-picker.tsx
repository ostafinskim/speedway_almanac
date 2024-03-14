'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from './calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Props {
    initialDate?: Date;
    field: {
        onChange: (date: Date) => void;
        onBlur: () => void;
        value: Date | string;
    };
}

export function DatePicker({ initialDate, field }: Props) {
    const [date, setDate] = useState<Date | undefined>(initialDate);
    const [stringDate, setStringDate] = useState(
        initialDate ? format(initialDate, 'PPP') : ''
    );
    const [errorMessage, setErrorMessage] = useState<string>('');

    return (
        <Popover key={date?.getDate()}>
            <div className="relative w-[280px]">
                <Input
                    type="string"
                    name={'dateOfBirth'}
                    value={stringDate}
                    onFocus={() => {
                        if (date) setStringDate(format(date, 'dd/MM/yyyy'));
                    }}
                    onChange={(e) => {
                        if (date) setStringDate('');
                        // setStringDate(e.target.value);
                        // field.onChange(e.target.value as unknown as Date);
                    }}
                    onBlur={(e) => {
                        let dateParts = e.target.value.split('/');
                        let parsedDate = new Date(
                            `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`
                        );

                        if (parsedDate.toString() === 'Invalid Date') {
                            setErrorMessage('Invalid Date');
                        } else {
                            setErrorMessage('');
                            setDate(parsedDate);
                            setStringDate(format(parsedDate, 'PPP'));
                            field.onChange(parsedDate);
                        }
                    }}
                />
                {errorMessage !== '' && (
                    <div className="absolute bottom-[-1.75rem] left-0 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">
                        {errorMessage}
                    </div>
                )}
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn(
                            'font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
            </div>
            <PopoverContent align="end" className="w-auto p-0">
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    defaultMonth={date}
                    onDayClick={(selectedDate) => {
                        if (!selectedDate) return;
                        setDate(selectedDate);
                        setStringDate(format(selectedDate, 'PPP'));
                        setErrorMessage('');
                        field.onChange(selectedDate);
                    }}
                    onDayBlur={field.onBlur}
                    fromYear={1900}
                    toYear={2060}
                />
            </PopoverContent>
        </Popover>
    );
}
