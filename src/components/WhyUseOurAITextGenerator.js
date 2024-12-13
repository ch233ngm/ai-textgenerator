import { useTranslations } from 'next-intl';
import { LockOpenIcon, CurrencyDollarIcon, UserIcon, ShieldCheckIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function WhyUseOurAITextGenerator() {
    const t = useTranslations('AITextGenerator');

    return (
        <div className="card bg-blue-50 mt-12 p-8">
            <h1 className="text-3xl font-bold text-center mb-10">{t('whyUseOurAITextGenerator')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { icon: LockOpenIcon, title: 'noLoginRequired', description: 'noLoginDescription', color: 'blue' },
                    { icon: CurrencyDollarIcon, title: 'completelyFree', description: 'freeDescription', color: 'green' },
                    { icon: UserIcon, title: 'userFriendly', description: 'userFriendlyDescription', color: 'purple' },
                    { icon: ShieldCheckIcon, title: 'privacyFocused', description: 'privacyDescription', color: 'red' },
                    { icon: ClockIcon, title: 'instantResults', description: 'instantResultsDescription', color: 'yellow' },
                    { icon: GlobeAltIcon, title: 'wideRangeOfUses', description: 'wideRangeDescription', color: 'indigo' },
                ].map(({ icon: Icon, title, description, color }, index) => (
                    <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-semibold flex items-center mb-4">
                            <Icon className={`h-6 w-6 mr-3 text-${color}-600`} />
                            {t(title)}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{t(description)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}