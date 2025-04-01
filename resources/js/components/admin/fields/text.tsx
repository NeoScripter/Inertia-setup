import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId } from 'react';

type TextFieldProps = {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export default function TextField({ name, label, value, onChange, error }: TextFieldProps) {
    const id = useId();

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} name={name} value={value} onChange={(e) => onChange(e.target.value)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
