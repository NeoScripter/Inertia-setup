import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId } from 'react';

type ColorFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export default function ColorField({ label, value, onChange, error }: ColorFieldProps) {
    const id = useId();

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="block">
                {label}
            </Label>
            <Input type="color" id={id} value={value || '#ffffff'} onChange={(e) => onChange(e.target.value)} className='cursor-pointer p-0 max-w-40' />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
