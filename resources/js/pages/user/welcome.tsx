import UserLayout from '@/layouts/user-layout';
import { BlockType } from '@/types/cmsBlock';
import { range } from '@/utils/range';

type WelcomeProps = {
    blocks: BlockType;
};

export default function Welcome({ blocks }: WelcomeProps) {
    return (
        <UserLayout title="Home">
            <main className="space-y-10 pt-10 text-center">
                <section>
                    <h1 className="mb-3 text-3xl font-bold">{blocks.hero.text}</h1>
                    <p>{blocks.hero.content}</p>
                </section>
                <section className="grid grid-cols-3 gap-6">
                    {range(1, 3).map((number) => {
                        const item = blocks[`intro${number}`];

                        return item ? (
                            <GridItem
                                key={`intro${number}`}
                                header={item.text || ''}
                                imagePath={item.image && `/storage/${item.image}`}
                                description={item.content || ''}
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
};

function GridItem({ header, description, imagePath }: GridItemProps) {
    return (
        <div className="space-y-2 text-center">
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
