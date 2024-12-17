import HeroSection from '@/components/home/HeroSection';
import FloatingNav from '@/components/home/FloatingNav';
import { getTranslations } from 'next-intl/server';
import LandingContent from './landingcontent';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://ai-textgenerator.net';
  const canonicalUrl = `${baseUrl}/${locale}`;
  const t = await getTranslations('Index');

  return {
    title: t('title'),
    description: t('description'),
    keywords: '',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/en`,
        'zh-CN': `${baseUrl}/zh`,
        'fr': `${baseUrl}/fr`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'A Free AI Text Generator, No Login!',
      locale: 'en_US',
      type: 'website',
      publishedTime: '2024-12-12',
      modifiedTime: '2024-12-17',
      url: canonicalUrl, // canonical url
      images: [`${baseUrl}/static/images/hero.webp`, `${baseUrl}/static/images/feat.webp`],
    },
    twitter: {
      card: 'summary_large_image',
      site: canonicalUrl,
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/static/images/hero.webp`, `${baseUrl}/static/images/feat.webp`],
    },
  };
}
export default function Home() {
  const baseUrl = 'https://ai-textgenerator.net';

  let jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Text Generator",
    "applicationCategory": "TextGeneration",
    "operatingSystem": "Web",
    "description": "Free AI tools: Text Generator creates original content, Response Generator crafts contextual replies. Enhance writing and communication effortlessly.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "url": "https://ai-textgenerator.net",
    "image": `${baseUrl}/static/images/hero.webp`,
    "datePublished": "2024-12-12",
    "dateModified": new Date().toISOString().split('T')[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-gray-100 relative">
        <HeroSection />
        <div className="relative z-10">
          <FloatingNav />
        </div>
        <div className="relative -mt-16 pt-16">
          <LandingContent />
        </div>
      </div>
    </>
  );
}