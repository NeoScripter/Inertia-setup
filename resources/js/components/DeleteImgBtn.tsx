import { Link } from '@inertiajs/react';

type DeleteImgBtnProps = {
    routeName: string;
    handleDeleteImage: () => void;
};

export default function DeleteImgBtn({ routeName, handleDeleteImage }: DeleteImgBtnProps) {
    return (
        <Link
            href={routeName}
            method="delete"
            onClick={handleDeleteImage}
            as="button"
            type="button"
            className="absolute top-1 right-1 inline-flex cursor-pointer items-center rounded-sm bg-red-600 p-1 text-center text-sm font-medium text-white hover:bg-red-400 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-400 dark:hover:bg-red-400 dark:focus:ring-red-400"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

            <span className="sr-only">Delete image</span>
        </Link>
    );
}
