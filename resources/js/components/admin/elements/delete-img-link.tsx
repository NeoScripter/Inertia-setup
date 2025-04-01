import { Link } from '@inertiajs/react';

type DeleteImgBtnProps = {
    routeName: string;
    handleDeleteImage: () => void;
    data?: {
        page_slug: string;
        block_slug: string;
    } | {
        id: number;
        page_slug: string;
        block_slug: string;
    }
};

export default function DeleteImgLink({ routeName, handleDeleteImage, data }: DeleteImgBtnProps) {
    return (
        <Link
            preserveScroll
            href={routeName}
            method="delete"
            onClick={handleDeleteImage}
            as="button"
            type="button"
            data={data && data}
            className="absolute top-0 right-0 inline-flex cursor-pointer items-center rounded-xs p-0.5 bg-red-600 text-center text-sm font-medium text-white hover:bg-red-400 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-400 dark:hover:bg-red-400 dark:focus:ring-red-400"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

            <span className="sr-only">Delete image</span>
        </Link>
    );
}
