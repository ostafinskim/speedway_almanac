import { Control } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';

type Country = {
    name: string;
    emoji: string;
};

type CustomFormSelectProps = {
    name: string;
    control: Control<any>;
    items: Country[];
    labelText?: string;
    field: {
        onChange: (country: String) => void;
        onBlur: () => void;
        value: string;
    };
};

export function CustomFormSelect({ items, field }: CustomFormSelectProps) {
    return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {items.map((item) => {
                    return (
                        <SelectItem key={item.name} value={item.name}>
                            {item.emoji} {item.name}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}
