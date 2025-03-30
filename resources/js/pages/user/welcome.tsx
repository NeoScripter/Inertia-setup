import UserLayout from '@/layouts/user-layout';
import { range } from '@/utils/range';

type WelcomeProps = {
    blocks: {
        hero: {
            text: string;
            content: string;
        };
    };
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
                    {range(1, 3).map((number) => (
                        <GridItem key={`Grid Item ${number}`} header={`This is item ${number}`} description={`this is description ${number}`} />
                    ))}
                </section>
            </main>
        </UserLayout>
    );
}

type GridItemProps = {
    header: string;
    description: string;
};

function GridItem({ header, description }: GridItemProps) {
    return (
        <div className="space-y-2 text-center">
            <header>{header}</header>
            <div></div>
            <p>{description}</p>
        </div>
    );
}
