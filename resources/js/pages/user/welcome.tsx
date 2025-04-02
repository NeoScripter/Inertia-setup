import UserLayout from '@/layouts/user-layout';
import { BlockType } from '@/types/cmsBlock';
import { cbk, pbk } from '@/utils/pickBlock';
import { range } from '@/utils/range';
import clsx from 'clsx';

type WelcomeProps = {
    blocks: BlockType;
};

export default function Welcome({ blocks }: WelcomeProps) {
    return (
        <UserLayout title="Home">
            <main className="space-y-10 pt-10 text-center">
                <section>
                    {cbk(blocks, 'hero', 'text') && <h1 className="mb-3 text-3xl font-bold">{blocks.hero.text}</h1>}
                    {cbk(blocks, 'hero', 'content') && <p>{blocks.hero.content}</p>}
                </section>
                <section className="grid grid-cols-3 gap-6">
                    {range(1, 3).map((number) => {
                        const item = pbk(blocks, `intro${number}`);

                        return item ? (
                            <GridItem
                                key={`intro${number}`}
                                header={item.text || ''}
                                imagePath={item.image && `/storage/${item.image}`}
                                description={item.content || ''}
                                isGreen={pbk(blocks, 'question')?.boolean ?? false}
                                date={item.date}
                            />
                        ) : null;
                    })}
                </section>
                <section>
                    <div className="flex flex-wrap items-start gap-2">
                        {blocks?.gallery?.images.map((image) => (
                            <div key={`${image.id}image`} className="size-40">
                                <img src={`/storage/${image.path}`} alt="" className="h-full w-full object-contain object-center" />
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <ul className="">{blocks?.groceries?.contents?.map((text, index) => <li key={index + 'text'}>{text}</li>)}</ul>
                </section>
            </main>
        </UserLayout>
    );
}

type GridItemProps = {
    header: string;
    description: string;
    imagePath: string | null;
    isGreen: boolean;
    date?: string | null;
};

function GridItem({ header, description, imagePath, isGreen, date }: GridItemProps) {
    console.log(date);
    return (
        <div className={clsx('space-y-2 text-center', isGreen && 'bg-green-400')}>
            <header>{header}</header>
            {imagePath && (
                <div>
                    <img src={imagePath} alt="image" />
                </div>
            )}
            <p>{description}</p>
            <p>{date}</p>
        </div>
    );
}
