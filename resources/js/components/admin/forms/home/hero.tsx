import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import ContentField from '../../ContentField';
import FormWrapper from '../../FormWrapper';
import TextField from '../../TextField';

export type HeroProps = {
    block: { text: string | null; content: string | null };
    slug: string;
};

export default function Hero({ block, slug }: HeroProps) {
    const { data, setData, post, processing, errors } = useForm({
        text: block.text || '',
        content: block.content || '',
    });

    return (
        <FormWrapper title="Главная секция" post={post} toastMessage="Hero successfully updated!" routeName="home.update" slug={slug}>
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

            <Button type="submit" disabled={processing}>
                Save
            </Button>
        </FormWrapper>
    );
}
