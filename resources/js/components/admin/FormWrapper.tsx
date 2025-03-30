import { formatDate } from '@/lib/utils';
import { VisitOptions } from 'node_modules/@inertiajs/core/types/types';
import { FormEvent } from 'react';
import { toast } from 'sonner';

type FormWrapperProps = {
    children: React.ReactNode;
    title: string;
    post: (url: string, options?: Omit<VisitOptions, 'data'>) => void;
    toastMessage: string;
    routeName: string;
    slug: string;
};
export default function FormWrapper({ post, children, title, toastMessage, routeName, slug }: FormWrapperProps) {

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
        <div className="border-muted rounded-xl border p-4">
            <h2 className="mb-4 text-lg font-semibold">{title}</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                {children}
            </form>
        </div>
    );
}
