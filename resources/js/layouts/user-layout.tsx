import { Head, Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface UserLayoutProps {
    title?: string;
}

export default function UserLayout({ children, title = '' }: PropsWithChildren<UserLayoutProps>) {
    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        <Link
                            href={route('home')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Home
                        </Link>
                        <Link
                            href={route('posts')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Posts
                        </Link>
                    </nav>
                </header>
                <div className="w-full mx-auto max-w-lg opacity-100 transition-all duration-750 lg:grow starting:opacity-0 starting:translate-x-1/2">
                    {children}
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
