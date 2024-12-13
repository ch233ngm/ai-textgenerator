import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function FrequentlyAskedQuestions() {
    const t = useTranslations('AITextGenerator');

    return (
        <div className="mt-24 px-6 py-12 bg-gray-50 rounded-xl">
            <h1 className="text-4xl font-bold text-center mb-12">{t('frequentlyAskedQuestions')}</h1>

            <div className="space-y-12 max-w-3xl mx-auto">
                {[
                    { question: 'whatIsAITextGenerator', answer: 'aiTextGeneratorDefinition' },
                    { question: 'whatCanAITextGeneratorDo', answer: 'aiTextGeneratorCapabilities' },
                    { question: 'whereToUseAITextGenerator', answer: 'aiTextGeneratorApplications' },
                    { question: 'popularAITextGenerators', answer: 'aiTextGeneratorExamples' }
                ].map((item, index) => (
                    <div key={index}>
                        <h2 className="text-xl font-semibold flex items-center mb-4 text-gray-700">
                            {t(item.question)}
                        </h2>
                        <p className="text-gray-500 leading-relaxed">
                            {t(item.answer)}
                        </p>
                        {index < 3 && <div className="divider divider-info">FAQ</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}