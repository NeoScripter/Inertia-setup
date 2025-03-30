import React, { useEffect, useId, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type FileInputProps = {
    label?: string;
    image: File | string | null;
    onChange: (file: File | null) => void;
    error?: string;
};

const FileInput: React.FC<FileInputProps> = ({ label = 'Фото', image, onChange, error }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const id = useId();

    useEffect(() => {
        if (image instanceof File) {
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
                <div className="mt-5 block w-max max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img src={previewUrl} alt="Preview" className="h-auto w-full rounded object-cover object-center" />
                </div>
            )}
        </div>
    );
};

export default FileInput;
