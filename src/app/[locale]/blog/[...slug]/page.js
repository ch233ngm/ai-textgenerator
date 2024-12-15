import { allBlogs, allAuthors } from 'contentlayer/generated'
import PostLayout from '../../../../layouts/PostLayout'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '../../../../components/MDXComponents'
import { coreContent } from 'pliny/utils/contentlayer'
import NotFound from '../../../../components/not-found'
import '@css/prism.css'
import '@css/tailwind.css'
import siteMetadata from '@data/siteMetadata'

export async function generateMetadata(props) {
    const params = await props.params
    const slug = decodeURI(params.slug.join('/'))
    const post = allBlogs.find((p) => p.slug === slug)
    const authorList = post?.authors || ['default']
    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return coreContent(authorResults)
    })

    if (!post) {
        return
    }

    const publishedAt = new Date(post.date).toISOString()
    const modifiedAt = new Date(post.lastmod || post.date).toISOString()
    const authors = authorDetails.map((author) => author.name)

    let imageList = []; // replace your og pic relative path to your og pic
    if (post.images) {
        imageList = typeof post.images === 'string' ? [post.images] : post.images
    }

    let metadata = {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            siteName: siteMetadata.title,
            locale: 'en_US',
            type: 'article',
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            url: siteMetadata.siteUrl + '/en/' + post._raw.flattenedPath, // canonical url
            images: imageList,
            authors: authors.length > 0 ? authors : [siteMetadata.author],
        },
        alternates: {
            canonical: siteMetadata.siteUrl + '/en/' + post._raw.flattenedPath, // canonical url
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.summary,
            images: imageList,
        },
    }
    return metadata
}

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