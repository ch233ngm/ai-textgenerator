import Main from './Main';
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent } from 'pliny/utils/contentlayer'


export default function Blog() {
    const posts = allCoreContent(allBlogs)
    return (
        <div className="bg-white pl-[calc(100vw-100%)] text-black antialiased mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <Main posts={posts} />
        </div>
    );
}