import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useForm } from '@inertiajs/react';
import ContentField from '../../ContentField';
import FileInput from '../../FileInput';
import FormWrapper from '../../FormWrapper';
import TextField from '../../TextField';

export type IntroProps = {
    block?: { text: string | null; content: string | null; image: File | string | null };
    slug: string;
};

export default function Intro({ block, slug }: IntroProps) {
    const { data, setData, post, processing, errors, progress } = useForm({
        text: block?.text || '',
        content: block?.content || '',
        image: block?.image || null,
    });

    return (
        <FormWrapper title="Карточка на главной странице" post={post} toastMessage="Intro successfully updated!" routeName="home.update" slug={slug}>
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

            <FileInput image={data.image} onChange={(file) => setData('image', file)} error={errors.image} />

            {progress && <Progress value={progress.percentage}>{progress.percentage}%</Progress>}

            <Button type="submit" disabled={processing}>
                Обновить
            </Button>
        </FormWrapper>
    );
}
