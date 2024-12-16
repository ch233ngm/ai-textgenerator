import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <p className="mb-6">{t('description')}</p>
      <ContactForm />
    </div>
  );
}
