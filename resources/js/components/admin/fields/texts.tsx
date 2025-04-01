import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { ChevronsUpDown, ListPlus, X } from 'lucide-react';
import { useId } from 'react';

type TextsFieldProps = {
    label: string;
    texts: string[];
    onChange: (updated: string[]) => void;
    errors?: Partial<Record<`texts.${number}`, string>>;
};

export default function TextsField({ label, texts, onChange, errors }: TextsFieldProps) {
    const id = useId();

    const handleTextChange = (index: number, value: string) => {
        const updated = [...texts];
        updated[index] = value;
        onChange(updated);
    };

    const removeText = (index: number) => {
        const updated = [...texts];
        updated.splice(index, 1);
        onChange(updated);
    };

    const addText = () => {
        onChange([...texts, '']);
    };

    return (
        <div className="border-muted mb-4 w-full space-y-2 rounded-xl border p-2 pb-0 shadow-sm">
            <Collapsible className="space-y-2">
                <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">{label}</h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="space-y-2 pb-2">
                    {texts.map((text, index) => {
                        const fieldKey = `texts.${index}` as keyof typeof errors;
                        const fieldError = errors?.[fieldKey];

                        return (
                            <div key={id + index}>
                                <div className="flex items-center gap-1">
                                    <Input id={id + index} value={text || ''} onChange={(e) => handleTextChange(index, e.target.value)} className={clsx(fieldError && 'border-red-500')} />
                                    <Button onClick={() => removeText(index)} variant="ghost" type="button" className={clsx('cursor-pointer', fieldError && 'text-red-500')}>
                                        <X className="size-5" />
                                    </Button>
                                </div>
                                {fieldError && <p className="ml-1 mt-1 text-sm text-red-500">{fieldError}</p>}
                            </div>
                        );
                    })}

                    <Button onClick={addText} type="button" variant="outline" className="ml-auto flex items-center gap-2">
                        Добавить пункт
                        <ListPlus />
                    </Button>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
