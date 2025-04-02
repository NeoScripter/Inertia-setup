import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { VisitOptions } from 'node_modules/@inertiajs/core/types/types';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import Spinner from '../elements/spinner';

type AccordionFormProps = {
    children: React.ReactNode;
    post: (url: string, options?: Omit<VisitOptions, 'data'>) => void;
    toastMessage: string;
    routeName: string;
    blockSlug: string;
    disabled: boolean;
    label: string;
};
export default function AccordionForm({ post, children, toastMessage, routeName, blockSlug, disabled, label }: AccordionFormProps) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route(routeName), {
            preserveScroll: true,

            onSuccess: () => {
                toast.message(toastMessage, {
                    description: formatDate(new Date()),
                });
            },
        });
    };

    return (
        <AccordionItem value={blockSlug}>
            <AccordionTrigger className="cursor-pointer font-semibold">{label}</AccordionTrigger>
            <AccordionContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {children}

                    <Button type="submit" disabled={disabled}>
                        {disabled ? (
                            <>
                                <Spinner />
                                <>Загрузка...</>
                            </>
                        ) : (
                            'Сохранить'
                        )}
                    </Button>
                </form>
            </AccordionContent>
        </AccordionItem>
    );
}
