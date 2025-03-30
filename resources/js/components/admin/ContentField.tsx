import { Label } from '@/components/ui/label';
import { useId } from 'react';
import { Textarea } from '../ui/textarea';

type ContentFieldProps = {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export default function ContentField({ name, label, value, onChange, error }: ContentFieldProps) {
    const id = useId();

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Textarea id={id} name={name} value={value} onChange={(e) => onChange(e.target.value)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
