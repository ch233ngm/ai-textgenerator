import Main from './Main';
export default function Blog() {
    const posts = [{
        slug: 'post-1',
        date: '2023-01-01',
        title: 'First Post',
        summary: 'This is the first post.',
        tags: ['Tech', 'News']
    },
    {
        slug: 'post-2',
        date: '2023-01-01',
        title: 'First Post',
        summary: 'This is the first post.',
        tags: ['Tech', 'News']
    }]
    return (
        <div className="bg-white pl-[calc(100vw-100%)] text-black antialiased mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <Main posts={posts} />
        </div>
    );
}