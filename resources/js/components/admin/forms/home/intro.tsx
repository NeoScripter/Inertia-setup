import { useForm } from '@inertiajs/react';
import ContentField from '../../ContentField';
import FileInput from '../../FileInput';
import FormWrapper from '../../FormWrapper';
import TextField from '../../TextField';

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
    });

    return (
        <FormWrapper label={label} post={post} toastMessage="Intro successfully updated!" routeName="home.update" slug={slug} disabled={processing}>
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

            <FileInput image={data.image} onChange={(file) => setData('image', file)} error={errors.image} routeName={route('home.image.destroy', slug)} />

        </FormWrapper>
    );
}
