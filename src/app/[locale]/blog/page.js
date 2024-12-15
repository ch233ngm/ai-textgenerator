import Main from './Main';
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent } from 'pliny/utils/contentlayer'

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const baseUrl = 'https://ai-textgenerator.net';
    const canonicalUrl = `${baseUrl}/${locale}/blog`;

    return {
        title: 'AI Text Generator Blog - Insights on AI Writing and Language Models',
        description: "Explore our blog for the latest insights on AI text generation, language models, and content creation. Learn how to leverage AI for your writing needs.",
        keywords: '',
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default function Blog() {
    const posts = allCoreContent(allBlogs)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    return (
        <div className="bg-white pl-[calc(100vw-100%)] text-black antialiased mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <Main posts={posts} />
        </div>
    );
}