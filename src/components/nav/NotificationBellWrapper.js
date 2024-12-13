import { useTranslations } from 'next-intl';
import NotificationBell from './NotificationBell';

export default function NotificationBellWrapper() {
    const t = useTranslations('Index');
    const freeUseMessage = t('FreeUseNotification');

    return <NotificationBell freeUseMessage={freeUseMessage} />;
}