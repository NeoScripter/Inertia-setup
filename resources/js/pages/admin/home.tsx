import Hero from '@/components/admin/forms/home/hero';
import Intro from '@/components/admin/forms/home/intro';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CmsBlock } from '@/types/cmsBlock';
import { range } from '@/utils/range';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/home',
    },
];

type PageProps = {
    blocks: Record<string, CmsBlock>;
};

export default function Home({ blocks }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin" />
            <div className="grid gap-4 rounded-xl p-4 md:grid-cols-2">
                <Hero block={blocks.hero} slug="hero" />
            </div>
            <div className="grid gap-4 rounded-xl p-4 md:grid-cols-3">
                {range(1, 3).map((digit) => (
                    <Intro key={`intro${digit}`} block={blocks[`intro${digit}`]} slug={`intro${digit}`} />
                ))}
            </div>
        </AppLayout>
    );
}
