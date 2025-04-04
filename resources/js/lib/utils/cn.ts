import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const defaultDateOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
    timeStyle: 'short',
};

export function formatDate(date: Date, options = defaultDateOptions) {
    return new Intl.DateTimeFormat(undefined, options).format(date);
}
