import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/cn';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useId } from 'react';

type DateFieldProps = {
    label: string;
    value: string | null;
    onChange: (val: string | null) => void;
    error?: string;
};

export default function DateField({ label, value, onChange, error }: DateFieldProps) {
    const id = useId();

    return (
        <div>
            <Label htmlFor={id} className="mb-2 block">
                {label}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        variant="outline"
                        className={cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format(new Date(value), 'PPP') : <span>Выберите дату</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        onSelect={(val) => onChange(val ? format(val, 'yyyy-MM-dd') : null)}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
