import { useForm } from '@inertiajs/react';
import TextsField from '../../fields/texts';
import AccordionForm from '../../forms/accordion-form';

export type GroceriesProps = {
    block?: { texts: string[] | null };
    slug: string;
    label: string;
};

export default function Groceries({ block, slug, label }: GroceriesProps) {
    const { data, setData, post, processing, errors } = useForm({
        texts: block?.texts || [],
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
            <TextsField label="Список покупок" texts={data.texts} onChange={(updated) => setData('texts', updated)} errors={errors} />
        </AccordionForm>
    );
}
