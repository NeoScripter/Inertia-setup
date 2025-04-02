import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId } from 'react';

type TextFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export default function TextField({ label, value, onChange, error }: TextFieldProps) {
    const id = useId();

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className='block'>{label}</Label>
            <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
