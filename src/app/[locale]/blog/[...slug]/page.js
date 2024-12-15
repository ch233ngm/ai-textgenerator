import { allBlogs, allAuthors } from 'contentlayer/generated'
import PostLayout from '../../../../layouts/PostLayout'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '../../../../components/MDXComponents'
import { coreContent } from 'pliny/utils/contentlayer'
import NotFound from '../../../../components/not-found'
import '@css/prism.css'
import '@css/tailwind.css'

export default async function Page(props) {
    const params = await props.params
    const slug = decodeURI(params.slug.join('/'))
    const post = allBlogs.find((p) => p.slug === slug)
    if (!post) {
        return <NotFound />
    }
    const jsonLd = post.structuredData
    const mainContent = coreContent(post)

    const authorList = post?.authors || ['default']
    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return coreContent(authorResults)
    })

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PostLayout content={mainContent} authorDetails={authorDetails}>
                <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
            </PostLayout>
        </>
    );

}