import { CmsImage } from '@/types/cmsBlock';
import { useForm } from '@inertiajs/react';
import ImagesField from '../../fields/images';
import AccordionForm from '../../forms/accordion-form';

export type GalleryProps = {
    block?: { images: CmsImage[] };
    slug: string;
    label: string;
};

type GalleryFormType = {
    images: File[];
    page_slug: string;
    block_slug: string;
};

export default function Gallery({ block, slug, label }: GalleryProps) {
    const { data, setData, post, processing, errors } = useForm<GalleryFormType>({
        images: [],
        page_slug: 'home',
        block_slug: slug,
    });

    return (
        <AccordionForm
            label={label}
            post={post}
            toastMessage="Галерея успешно обновлена!"
            routeName="admin.update"
            blockSlug={slug}
            disabled={processing}
        >
            <ImagesField
                blockImages={block?.images}
                errors={errors}
                value={data.images}
                onChange={(imgs) => setData('images', imgs)}
                pageSlug="home"
                blockSlug={slug}
                reorderRouteName={route('admin.images.reorder')}
                deleteRouteName={route('admin.images.destroy')}
            />
        </AccordionForm>
    );
}
