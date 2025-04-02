import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useId } from 'react';

type ContentFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export default function ContentField({ label, value, onChange, error }: ContentFieldProps) {
    const id = useId();

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className='block'>{label}</Label>
            <Textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
