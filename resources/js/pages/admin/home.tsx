import Hero from '@/components/admin/pages/home/hero';
import Intro from '@/components/admin/pages/home/intro';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BlockType } from '@/types/cmsBlock';
import { range } from '@/utils/range';
import { pickBlock } from '@/utils/pickBlock';
import { Head } from '@inertiajs/react';
import AccordionWrapper from '@/components/admin/forms/AccordionWrapper';
import Question from '@/components/admin/pages/home/question';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/home',
    },
];

type PageProps = {
    blocks: BlockType;
};


export default function Home({ blocks }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin" />
            <div className="grid gap-4 rounded-xl p-4 md:grid-cols-2">
                <div>
                    <h2 className="p-2 text-lg font-bold">Хиро секция</h2>
                    <AccordionWrapper>
                        <Hero label="Заголовок главной страницы" block={pickBlock(blocks, 'hero')} slug="hero" />
                    </AccordionWrapper>
                </div>
            </div>
            <div className="grid gap-4 rounded-xl p-4 md:grid-cols-2">
                <div>
                    <h2 className="p-2 text-lg font-bold">Карточки на главной странице</h2>
                    <AccordionWrapper>
                        {range(1, 3).map((digit) => (
                            <Intro key={`intro${digit}`} label={`Карточка ${digit}`} block={pickBlock(blocks, `intro${digit}`)} slug={`intro${digit}`} />
                        ))}
                    </AccordionWrapper>
                </div>
            </div>
            <div className="grid gap-4 rounded-xl p-4 md:grid-cols-2">
                <div>
                    <h2 className="p-2 text-lg font-bold">Цвет карточек на странице</h2>
                    <AccordionWrapper>
                        <Question label='Вопрос' block={pickBlock(blocks, 'question')} slug="question" />
                    </AccordionWrapper>
                </div>
            </div>
        </AppLayout>
    );
}
