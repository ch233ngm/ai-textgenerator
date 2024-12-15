import { Link } from 'next-view-transitions';
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@data/siteMetadata'

const MAX_DISPLAY = 5;

export default function Home({ posts }) {
    return (
        <>
            <div className="divide-y divide-gray-200 mb-auto">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Latest
                    </h1>
                    <p className="text-lg leading-7 text-gray-500">Demystifying AI text generation for creators and developers</p>
                </div>
                <ul className="divide-y divide-gray-200">
                    {!posts.length && 'No posts found.'}
                    {posts.slice(0, MAX_DISPLAY).map((post) => {
                        const { slug, date, title, summary, tags } = post;
                        return (<li key={slug} className="py-12">
                            <article>
                                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                    <dl>
                                        <dt className="sr-only">Published on</dt>
                                        <dd className="text-base font-medium leading-6 text-gray-500">
                                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                                        </dd>
                                    </dl>
                                    <div className="space-y-5 xl:col-span-3">
                                        <div className="space-y-6">
                                            <div>
                                                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                    <Link
                                                        href={`/blog/${slug}`}
                                                        className="text-gray-900"
                                                    >
                                                        {title}
                                                    </Link>
                                                </h2>
                                                <div className="flex flex-wrap">
                                                    {tags.map((tag) => (
                                                        <a key={tag} className='mr-3 text-sm font-medium uppercase text-pink-500 hover:text-pink-600'>
                                                            {tag}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="prose max-w-none text-gray-500">
                                                {summary}
                                            </div>
                                        </div>
                                        <div className="text-base font-medium leading-6">
                                            <Link
                                                href={`/blog/${slug}`}
                                                className="text-pink-500 hover:text-pink-600"
                                                aria-label={`Read more: "${title}"`}
                                            >
                                                Read more &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>)
                    })}
                </ul>
            </div>
        </>
    );
}