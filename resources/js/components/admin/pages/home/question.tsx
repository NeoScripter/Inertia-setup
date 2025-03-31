import { useForm } from '@inertiajs/react';
import AccordionForm from '../../forms/AccordionForm';
import BooleanField from '../../fields/BooleanField';

export type QuestionProps = {
    block?: { boolean: boolean | null };
    slug: string;
    label: string;
};

export default function Question({ block, slug, label }: QuestionProps) {
    const { data, setData, post, processing } = useForm({
        boolean: block?.boolean || false,
        page_slug: 'home',
        block_slug: slug,
    });

    return (
        <AccordionForm
            label={label}
            post={post}
            toastMessage="Question successfully updated!"
            routeName="admin.update"
            blockSlug={slug}
            disabled={processing}
        >
            <BooleanField
                value={data.boolean}
                onChange={(val) => setData('boolean', val)}
                label="Сделать карточки зеленого цвета?"
            />
        </AccordionForm>
    );
}
