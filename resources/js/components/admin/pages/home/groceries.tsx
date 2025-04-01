import { useForm } from '@inertiajs/react';
import AccordionForm from '../../forms/accordion-form';
import ContentsField from '../../fields/contents';

export type GroceriesProps = {
    block?: { contents: string[] | null };
    slug: string;
    label: string;
};

export default function Groceries({ block, slug, label }: GroceriesProps) {
    const { data, setData, post, processing, errors } = useForm({
        contents: block?.contents || [],
        page_slug: 'home',
        block_slug: slug,
    });

    return (
        <AccordionForm
            label={label}
            post={post}
            toastMessage="Groceries successfully updated!"
            routeName="admin.update"
            blockSlug={slug}
            disabled={processing}
        >
            <ContentsField label="Список покупок" contents={data.contents} onChange={(updated) => setData('contents', updated)} errors={errors} />
        </AccordionForm>
    );
}
