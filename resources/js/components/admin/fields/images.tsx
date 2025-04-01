import { CmsImage } from '@/types/cmsBlock';
import { router } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import DeleteImgBtn from '../elements/delete-img-btn';
import DeleteImgLink from '../elements/delete-img-link';

type ImagesFieldProps = {
    blockImages?: CmsImage[];
    errors?: Record<string, string>;
    value: File[];
    onChange: (images: File[]) => void;
    pageSlug: string;
    blockSlug: string;
};

export default function ImagesField({ blockImages = [], errors = {}, value, onChange, pageSlug, blockSlug }: ImagesFieldProps) {
    const [previewImages, setPreviewImages] = useState<File[]>(value);

    const maxSize = 1024 * 1024; // 1MB

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

    router.on('success', () => {
        onChange([]);
        setPreviewImages([]);
    });

    return (
        <>
            <div>
                <input type="file" multiple accept="image/*" onChange={handleNewFileSelect} />
                {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
            </div>

            {(blockImages.length > 0 || previewImages.length > 0) && (
                <div className="mt-4 flex flex-wrap items-start gap-2">
                    {blockImages.map((img) => (
                        <div
                            key={img.id}
                            className="group relative block h-40 w-40 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
                        >
                            <img
                                src={`/storage/${img.path}`}
                                alt={`Image ${img.id}`}
                                className="h-full w-full rounded object-contain object-center transition-all duration-300 ease-in-out group-hover:blur-[1.5px]"
                            />
                            <DeleteImgLink
                                routeName={route('admin.images.destroy')}
                                handleDeleteImage={() => {}}
                                data={{ id: img.id, page_slug: pageSlug, block_slug: blockSlug }}
                            />
                        </div>
                    ))}

                    {previewImages.map((file, index) => (
                        <div
                            key={index}
                            className="group relative block h-40 w-40 rounded-lg border border-dashed border-gray-300 bg-gray-50 shadow-sm"
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`New Image ${index}`}
                                className="h-full w-full rounded object-contain object-center transition-all duration-300 ease-in-out group-hover:blur-[1.5px]"
                            />
                            <DeleteImgBtn onClick={() => removeTempImage(index)} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
