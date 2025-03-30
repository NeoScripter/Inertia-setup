import { formatDate } from '@/lib/utils';
import { VisitOptions } from 'node_modules/@inertiajs/core/types/types';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import Spinner from './Spinner';

type FormWrapperProps = {
    children: React.ReactNode;
    post: (url: string, options?: Omit<VisitOptions, 'data'>) => void;
    toastMessage: string;
    routeName: string;
    slug: string;
    disabled: boolean;
    label: string;
};
export default function FormWrapper({ post, children, toastMessage, routeName, slug, disabled, label }: FormWrapperProps) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route(routeName, slug), {
            preserveScroll: true,

            onSuccess: () => {
                toast.message(toastMessage, {
                    description: formatDate(new Date()),
                });
            },
        });
    };

    return (
        <AccordionItem value={slug}>
            <AccordionTrigger className="text-lg font-semibold cursor-pointer">{label}</AccordionTrigger>
            <AccordionContent>
                <form onSubmit={handleSubmit} className="space-y-3">
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
