import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils/cn';
import { VisitOptions } from 'node_modules/@inertiajs/core/types/types';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import Spinner from '../elements/spinner';


type FormWrapperProps = {
    children: React.ReactNode;
    post: (url: string, options?: Omit<VisitOptions, 'data'>) => void;
    toastMessage: string;
    routeName: string;
    slug: string;
    disabled: boolean;
};
export default function FormWrapper({ post, children, toastMessage, routeName, slug, disabled }: FormWrapperProps) {
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
        <div className='p-4 border border-sidebar-border/70 dark:border-sidebar-border rounded-xl'>
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
        </div>
    );
}
