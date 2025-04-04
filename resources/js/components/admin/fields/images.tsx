import { Input } from '@/components/ui/input';
import { CmsImage } from '@/lib/types/cmsBlock';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { router } from '@inertiajs/react';
import { ChangeEvent, useEffect, useId, useState } from 'react';
import { toast } from 'sonner';
import DeleteImgBtn from '../elements/delete-img-btn';
import DeleteImgLink from '../elements/delete-img-link';

const maxSize = 1024 * 1024; // 1MB

type ImagesFieldProps = {
    blockImages?: CmsImage[];
    errors?: Record<string, string>;
    value: File[];
    onChange: (images: File[]) => void;
    pageSlug?: string;
    blockSlug?: string;
    reorderRouteName: string;
    deleteRouteName: string;
};

export default function ImagesField({ blockImages = [], errors = {}, value, onChange, pageSlug = '', blockSlug = '', reorderRouteName, deleteRouteName }: ImagesFieldProps) {
    const id = useId();
    const [previewImages, setPreviewImages] = useState<File[]>(value);
    const [orderedImages, setOrderedImages] = useState(blockImages);

    useEffect(() => {
        setOrderedImages(blockImages);
    }, [blockImages.length]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleNewFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const validFiles = Array.from(files).filter((file) => {
            if (file.size > maxSize) {
                toast.error(`Файл "${file.name}" превышает 1MB`);
                return false;
            }
            return true;
        });

        const updated = [...previewImages, ...validFiles];
        setPreviewImages(updated);
        onChange(updated);
    };

    const removeTempImage = (index: number) => {
        const updated = [...previewImages];
        updated.splice(index, 1);
        setPreviewImages(updated);
        onChange(updated);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = orderedImages.findIndex((img) => img.id === active.id);
        const newIndex = orderedImages.findIndex((img) => img.id === over.id);

        const newOrder = arrayMove(orderedImages, oldIndex, newIndex);
        setOrderedImages(newOrder);

        router.post(
            reorderRouteName,
            {
                page_slug: pageSlug,
                block_slug: blockSlug,
                order: newOrder.map((img) => img.id),
            },
            {
                preserveScroll: true,
            },
        );
    };

    router.on('success', () => {
        onChange([]);
        setPreviewImages([]);
        setOrderedImages(blockImages);
    });

    return (
        <>
            <div>
                <Input id={id} type="file" multiple accept="image/*" onChange={handleNewFileSelect} className="block cursor-pointer pt-2" />
                {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
            </div>

            {(orderedImages.length > 0 || previewImages.length > 0) && (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={orderedImages.map((img) => img.id)} strategy={horizontalListSortingStrategy}>
                        <div className="mt-4 flex flex-wrap items-start gap-2">
                            {orderedImages.map((img) => (
                                <SortableImage key={img.id} img={img} pageSlug={pageSlug} blockSlug={blockSlug} deleteRouteName={deleteRouteName} />
                            ))}

                            {previewImages.map((file, index) => (
                                <div
                                    key={`preview-${index}`}
                                    className="group relative block h-40 w-40 rounded-lg border border-dashed border-gray-300 bg-gray-50 shadow-sm"
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Новое фото ${index}`}
                                        className="h-full w-full rounded object-contain object-center transition-all duration-300 ease-in-out group-hover:blur-[1.5px]"
                                    />
                                    <DeleteImgBtn onClick={() => removeTempImage(index)} />
                                </div>
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </>
    );
}

type SortableImageProps = {
    img: CmsImage;
    pageSlug: string;
    blockSlug: string;
    deleteRouteName: string;
};

function SortableImage({ img, pageSlug, blockSlug, deleteRouteName }: SortableImageProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: img.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className="relative">
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="group block h-40 w-40 cursor-grab rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
                <img
                    src={`/storage/${img.path}`}
                    alt={`Фото ${img.id}`}
                    className="h-full w-full rounded object-contain object-center transition-all duration-300 ease-in-out group-hover:blur-[1.5px]"
                />
            </div>
            <DeleteImgLink
                routeName={deleteRouteName}
                handleDeleteImage={() => {}}
                data={{ id: img.id, page_slug: pageSlug, block_slug: blockSlug }}
            />
        </div>
    );
}
