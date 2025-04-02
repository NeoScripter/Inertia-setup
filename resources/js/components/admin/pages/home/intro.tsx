import { useForm } from '@inertiajs/react';

import { format } from 'date-fns';
import ContentField from '../../fields/content';
import DateField from '../../fields/date';
import ImageField from '../../fields/image';
import NumberField from '../../fields/number';
import TextField from '../../fields/text';
import AccordionForm from '../../forms/accordion-form';

export type IntroProps = {
    block?: { text: string | null; content: string | null; image: File | string | null; date: string | null; number: number | null };
    slug: string;
    label: string;
};

export default function Intro({ block, slug, label }: IntroProps) {
    const { data, setData, post, processing, errors } = useForm({
        text: block?.text || '',
        number: block?.number || null,
        content: block?.content || '',
        image: block?.image || null,
        date: block?.date ? format(block.date, 'yyyy-MM-dd') : null,
        page_slug: 'home',
        block_slug: slug,
    });

    return (
        <AccordionForm
            label={label}
            post={post}
            toastMessage="Intro successfully updated!"
            routeName="admin.update"
            blockSlug={slug}
            disabled={processing}
        >
            <TextField
                label="Заголовок главной страницы"
                value={data.text}
                onChange={(val) => setData('text', val)}
                error={errors.text}
            />

            <NumberField
                label="Число на странице"
                value={data.number}
                onChange={(val) => setData('number', val)}
                error={errors.number}
            />

            <ContentField
                label="Подзаголовок главной страницы"
                value={data.content}
                onChange={(val) => setData('content', val)}
                error={errors.content}
            />

            <ImageField
                blockSlug={slug}
                pageSlug="home"
                image={data.image}
                onChange={(file) => setData('image', file)}
                error={errors.image}
                routeName={route('admin.image.destroy', slug)}
            />

            <DateField label="Выберите дату" value={data.date} onChange={(val) => setData('date', val)} error={errors.date} />
        </AccordionForm>
    );
}
