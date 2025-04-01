import { useForm } from '@inertiajs/react';

import TextField from '../../fields/text';
import ContentField from '../../fields/content';
import ImageField from '../../fields/image';
import AccordionForm from '../../forms/accordion-form';

export type IntroProps = {
    block?: { text: string | null; content: string | null; image: File | string | null };
    slug: string;
    label: string;
};

export default function Intro({ block, slug, label }: IntroProps) {
    const { data, setData, post, processing, errors } = useForm({
        text: block?.text || '',
        content: block?.content || '',
        image: block?.image || null,
        page_slug: 'home',
        block_slug: slug,
    });

    return (
        <AccordionForm label={label} post={post} toastMessage="Intro successfully updated!" routeName="admin.update" blockSlug={slug} disabled={processing}>
            <TextField
                name="text"
                label="Заголовок главной страницы"
                value={data.text}
                onChange={(val) => setData('text', val)}
                error={errors.text}
            />

            <ContentField
                name="content"
                label="Подзаголовок главной страницы"
                value={data.content}
                onChange={(val) => setData('content', val)}
                error={errors.content}
            />

            <ImageField blockSlug={slug} pageSlug='home' image={data.image} onChange={(file) => setData('image', file)} error={errors.image} routeName={route('admin.image.destroy', slug)} />

        </AccordionForm>
    );
}
