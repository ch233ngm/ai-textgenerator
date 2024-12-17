import { allBlogs, allAuthors } from 'contentlayer/generated'
import PostLayoutFea from '@layouts/PostLayoutFea'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@components/MDXComponents'
import { coreContent } from 'pliny/utils/contentlayer'
import NotFound from '@components/not-found'
import '@css/prism.css'
import '@css/tailwind.css'
import siteMetadata from '@data/siteMetadata'
import AIResponseGenerator from './fea';

export async function generateMetadata(props) {
    const { locale } = await props.params
    const slug = 'ai-response-generator'
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
            type: 'website',
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            url: siteMetadata.siteUrl + `/${locale}/ai-response-generator`, // canonical url
            images: imageList,
            authors: authors.length > 0 ? authors : [siteMetadata.author],
        },
        alternates: {
            canonical: siteMetadata.siteUrl + `/${locale}/ai-response-generator`, // canonical url
        },
        twitter: {
            card: 'summary_large_image',
            site: siteMetadata.siteUrl,
            title: post.title,
            description: post.summary,
            images: imageList,
        },
    }
    return metadata
}

export default async function Page(props) {
    const { locale } = await props.params
    const slug = 'ai-response-generator'
    const post = allBlogs.find((p) => p.slug === slug)
    if (!post) {
        return <NotFound />
    }
    const mainContent = coreContent(post)

    const authorList = post?.authors || ['default']
    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return coreContent(authorResults)
    })


    let jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AI Response Generator",
        "applicationCategory": "TextGeneration",
        "operatingSystem": "Web",
        "description": "AI tool for personalized responses based on context, relationship, and input. Enhance communication across various scenarios.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "url": siteMetadata.siteUrl + `/${locale}/ai-response-generator`,
        // "image": "",
        "datePublished": "2024-12-16",
        // "dateModified": modifiedAt,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            < AIResponseGenerator />
            <PostLayoutFea content={mainContent} authorDetails={authorDetails}>
                <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
            </PostLayoutFea>
        </>
    );

}