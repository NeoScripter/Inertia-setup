import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import clsx from 'clsx';
import { ChevronsUpDown, ListPlus, ListX } from 'lucide-react';
import { useId } from 'react';

type ContentsFieldProps = {
    label: string;
    contents: string[];
    onChange: (updated: string[]) => void;
    errors?: Partial<Record<`contents.${number}`, string>>;
};

export default function ContentsField({ label, contents, onChange, errors }: ContentsFieldProps) {
    const id = useId();

    const handleTextChange = (index: number, value: string) => {
        const updated = [...contents];
        updated[index] = value;
        onChange(updated);
    };

    const removeText = (index: number) => {
        const updated = [...contents];
        updated.splice(index, 1);
        onChange(updated);
    };

    const addText = () => {
        onChange([...contents, '']);
    };

    return (
        <div className="border-muted mb-4 w-full space-y-2 rounded-xl border p-2 pb-0 shadow-sm">
            <Collapsible className="space-y-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between space-x-4 px-4 cursor-pointer">
                    <h4 className="text-sm font-semibold">{label}</h4>
                    <Button type="button" variant="ghost" size="sm" className='cursor-pointer'>
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2 pb-2">
                    {contents.map((text, index) => {
                        const fieldKey = `contents.${index}` as keyof typeof errors;
                        const fieldError = errors?.[fieldKey];

                        return (
                            <div key={id + index}>
                                <div className="flex items-start gap-1">
                                    <Textarea
                                        id={id + index}
                                        value={text || ''}
                                        onChange={(e) => handleTextChange(index, e.target.value)}
                                        className={clsx(fieldError && 'border-red-500')}
                                    />
                                    <Button
                                        onClick={() => removeText(index)}
                                        variant="ghost"
                                        type="button"
                                        className={clsx('cursor-pointer')}
                                    >
                                        <ListX className="size-5" />
                                    </Button>
                                </div>
                                {fieldError && <p className="mt-1 ml-1 text-sm text-red-500">{fieldError}</p>}
                            </div>
                        );
                    })}

                    <Button onClick={addText} type="button" variant="outline" className="ml-auto flex items-center gap-2 cursor-pointer">
                        Добавить пункт
                        <ListPlus />
                    </Button>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
