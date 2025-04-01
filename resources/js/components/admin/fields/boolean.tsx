import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useId } from 'react';

interface BooleanFieldProps {
    value: boolean;
    onChange: (value: boolean) => void;
    label: string;
    className?: string;
}

export default function BooleanField({ value, onChange, label, className = '' }: BooleanFieldProps) {
    const id = useId();

    return (
        <div className={`border-muted rounded-xl border px-4 py-2 ${className}`}>
            <div className="mt-2 flex items-center space-x-3 pb-3">
                <Switch id={id} checked={value} onCheckedChange={onChange} />
                <Label htmlFor={id}>{label}</Label>
            </div>
        </div>
    );
}
