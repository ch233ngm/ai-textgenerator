import HeroSection from '@/components/home/HeroSection';
import { useTranslations } from 'next-intl';


export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://ai-textgenerator.net';
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    title: 'AI Text Generator (Free, No Login!)',
    description: "",
    keywords: '',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${baseUrl}/en`,
        'zh-CN': `${baseUrl}/zh`,
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