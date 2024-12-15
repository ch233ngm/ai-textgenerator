import HeroSection from '@/components/home/HeroSection';
import { getTranslations } from 'next-intl/server';

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
  };
}
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
     <HeroSection/>

    </div>
  );
}