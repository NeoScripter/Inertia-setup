import { useForm } from '@inertiajs/react';
import ContentField from '../../ContentField';
import FormWrapper from '../../FormWrapper';
import TextField from '../../TextField';

export type HeroProps = {
    block: { text: string | null; content: string | null };
    slug: string;
    label: string;
};

export default function Hero({ block, slug, label }: HeroProps) {
    const { data, setData, post, processing, errors } = useForm({
        text: block.text || '',
        content: block.content || '',
    });

    return (
        <FormWrapper label={label} post={post} toastMessage="Hero successfully updated!" routeName="home.update" slug={slug} disabled={processing}>
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
        </FormWrapper>
    );
}
