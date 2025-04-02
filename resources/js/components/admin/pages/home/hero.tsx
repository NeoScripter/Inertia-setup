import { useForm } from '@inertiajs/react';
import ColorField from '../../fields/color';
import ContentField from '../../fields/content';
import TextField from '../../fields/text';
import AccordionForm from '../../forms/accordion-form';

export type HeroProps = {
    block?: { text: string | null; content: string | null; color: string | null };
    slug: string;
    label: string;
};

export default function Hero({ block, slug, label }: HeroProps) {
    const { data, setData, post, processing, errors } = useForm({
        text: block?.text || '',
        content: block?.content || '',
        color: block?.color || '#ffffff',
        page_slug: 'home',
        block_slug: slug,
    });

    return (
        <AccordionForm
            label={label}
            post={post}
            toastMessage="Hero successfully updated!"
            routeName="admin.update"
            blockSlug={slug}
            disabled={processing}
        >
            <TextField label="Заголовок главной страницы" value={data.text} onChange={(val) => setData('text', val)} error={errors.text} />

            <ContentField
                label="Подзаголовок главной страницы"
                value={data.content}
                onChange={(val) => setData('content', val)}
                error={errors.content}
            />

            <ColorField label="Цвет на странице" value={data.color} onChange={(val) => setData('color', val)} error={errors.color} />
        </AccordionForm>
    );
}
