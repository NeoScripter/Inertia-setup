import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId } from 'react';

type NumberFieldProps = {
    label: string;
    value: number | null;
    onChange: (value: number | null) => void;
    error?: string;
};

export default function NumberField({ label, value, onChange, error }: NumberFieldProps) {
    const id = useId();

    return (
        <div className="max-w-xs space-y-2">
            <Label htmlFor={id} className='block'>{label}</Label>
            <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                id={id}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
