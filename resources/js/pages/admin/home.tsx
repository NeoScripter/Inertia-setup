import Hero from '@/components/admin/pages/home/hero';
import Intro from '@/components/admin/pages/home/intro';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BlockType } from '@/types/cmsBlock';
import { range } from '@/utils/range';
import { pbk } from '@/utils/pickBlock';
import { Head } from '@inertiajs/react';
import AccordionWrapper from '@/components/admin/forms/accordion-wrapper';
import Question from '@/components/admin/pages/home/question';
import Gallery from '@/components/admin/pages/home/gallery';
import Groceries from '@/components/admin/pages/home/groceries';

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
            <div className="max-w-2xl px-2 md:px-4">
                <div>
                    <h2 className="p-2 text-lg font-bold">Хиро секция</h2>
                    <AccordionWrapper>
                        <Hero label="Заголовок главной страницы" block={pbk(blocks, 'hero')} slug="hero" />
                    </AccordionWrapper>
                </div>
            </div>
            <div className="max-w-2xl px-2 md:px-4">
                <div>
                    <h2 className="p-2 text-lg font-bold">Карточки на главной странице</h2>
                    <AccordionWrapper>
                        {range(1, 3).map((digit) => (
                            <Intro key={`intro${digit}`} label={`Карточка ${digit}`} block={pbk(blocks, `intro${digit}`)} slug={`intro${digit}`} />
                        ))}
                    </AccordionWrapper>
                </div>
            </div>
            <div className="max-w-2xl px-2 md:px-4">
                <div>
                    <h2 className="p-2 text-lg font-bold">Цвет карточек на странице</h2>
                    <AccordionWrapper>
                        <Question label='Вопрос' block={pbk(blocks, 'question')} slug="question" />
                    </AccordionWrapper>
                </div>
            </div>

            <div className="max-w-2xl px-2 md:px-4">
                <div>
                    <h2 className="p-2 text-lg font-bold">Галерея фотографий</h2>
                    <AccordionWrapper>
                        <Gallery label='Фотографии' block={pbk(blocks, 'gallery')} slug="gallery" />
                    </AccordionWrapper>
                </div>
            </div>
            <div className="max-w-2xl px-2 md:px-4">
                <div>
                    <h2 className="p-2 text-lg font-bold">Список покупок</h2>
                    <AccordionWrapper>
                        <Groceries label='Покупки' block={pbk(blocks, 'groceries')} slug="groceries" />
                    </AccordionWrapper>
                </div>
            </div>
        </AppLayout>
    );
}
