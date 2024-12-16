import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose max-w-none">
        <p>{t('intro')}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">{t('dataCollection.title')}</h2>
        <p>{t('dataCollection.content')}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">{t('contact.title')}</h2>
        <p>{t('contact.content')}</p>
        <p>
          <Link href="/contact" className="text-blue-600 hover:underline">
            {t('contact.linkText')}
          </Link>
        </p>
      </div>
    </div>
  );
}
