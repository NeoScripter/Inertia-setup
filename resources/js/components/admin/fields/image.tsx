import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useId, useState } from 'react';
import { toast } from 'sonner';
import DeleteImgLink from '../elements/delete-img-link';

type ImageFieldProps = {
    label?: string;
    image: File | string | null;
    onChange: (file: File | null) => void;
    error?: string;
    routeName: string;
    pageSlug: string;
    blockSlug: string;
};

const maxSize = 1024 * 1024; // 1MB

const ImageField: React.FC<ImageFieldProps> = ({ label = 'Фото', image, onChange, error, routeName, pageSlug, blockSlug }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const id = useId();

    useEffect(() => {
        if (image instanceof File) {
            if (image.size > maxSize) {
                toast.error(`Файл "${image.name}" превышает 1MB`);
                onChange(null);
                return;
            }

            const url = URL.createObjectURL(image);

            setPreviewUrl(url);

            return () => URL.revokeObjectURL(url);
        }

        if (typeof image === 'string' && image.length > 0) {
            setPreviewUrl(`/storage/${image}`);
        } else {
            setPreviewUrl(null);
        }
    }, [image]);

    function handleDeleteImage() {
        setPreviewUrl(null);
        onChange(null);
    }

    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}

            <Input
                id={id}
                type="file"
                accept="image/*"
                onChange={(e) => onChange(e.target.files?.[0] || null)}
                className="block cursor-pointer pt-2"
            />

            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>}

            {previewUrl && (
                <div className="group relative mt-5 block h-40 w-max max-w-xs rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full rounded object-contain object-center transition-all duration-300 ease-in-out group-hover:blur-[1.5px]"
                    />

                    <DeleteImgLink
                        routeName={routeName}
                        handleDeleteImage={handleDeleteImage}
                        data={{ page_slug: pageSlug, block_slug: blockSlug }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageField;
