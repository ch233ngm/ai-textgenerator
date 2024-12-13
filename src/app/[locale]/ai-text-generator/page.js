import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import WhyUseOurAITextGenerator from '../../../components/WhyUseOurAITextGenerator';
import FrequentlyAskedQuestions from '../../../components/FrequentlyAskedQuestions';
import AITextGeneratorClient from '../../../components/AITextGeneratorClient';

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const baseUrl = 'https://ai-textgenerator.net';
    const canonicalUrl = `${baseUrl}/${locale}/ai-text-generator`;
  
    return {
      title: 'AI Text Generator (Free, No Login!)',
      description: "Generate creative text, articles, and more with our AI Text Generator, no login needed! Free, no sign-up required. Don't miss out on your creative journey!",
      keywords: '',
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

export default function Home() {
    const t = useTranslations('AITextGenerator');
    const th = useTranslations('Index');

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center">{t('title')}</h1>
            <h2 className="text-xm text-center mb-4">
                <p className="py-6 font-mono">
                    {th('heroP')}<br /> {th('heroP2')}
                </p>
            </h2>
            <AITextGeneratorClient/>
            <WhyUseOurAITextGenerator />
            <FrequentlyAskedQuestions />
        </div>
    );
}