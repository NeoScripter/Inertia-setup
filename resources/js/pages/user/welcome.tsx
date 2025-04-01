import UserLayout from '@/layouts/user-layout';
import { BlockType } from '@/types/cmsBlock';
import { pickBlock } from '@/utils/pickBlock';
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
                    <h1 className="mb-3 text-3xl font-bold">{blocks?.hero?.text || 'No content'}</h1>
                    <p>{blocks?.hero?.content || 'No content'}</p>
                </section>
                <section className="grid grid-cols-3 gap-6">
                    {range(1, 3).map((number) => {
                        const item = pickBlock(blocks, `intro${number}`);

                        return item ? (
                            <GridItem
                                key={`intro${number}`}
                                header={item.text || ''}
                                imagePath={item.image && `/storage/${item.image}`}
                                description={item.content || ''}
                                isGreen={pickBlock(blocks, 'question')?.boolean ?? false}
                            />
                        ) : null;
                    })}
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
};

function GridItem({ header, description, imagePath, isGreen }: GridItemProps) {
    return (
        <div className={clsx("space-y-2 text-center", isGreen && 'bg-green-400')}>
            <header>{header}</header>
            {imagePath && (
                <div>
                    <img src={imagePath} alt="image" />
                </div>
            )}
            <p>{description}</p>
        </div>
    );
}
