import { Link } from 'next-view-transitions';
import LanguageSwitcher from './LanguageSwitcher';
import NotificationBellWrapper from './NotificationBellWrapper';
import { useTranslations } from 'next-intl';
import { HomeIcon, FaceSmileIcon, NewspaperIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
    const t = useTranslations('Index');

    return (
        <>
            <div className="h-16"></div> {/* Spacer */}
            <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50 shadow-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href="/"><HomeIcon className="h-5 w-5 mr-2" />{t('Home')}</Link></li>
                            {/* <li><Link href="/feature"><SparklesIcon className="h-5 w-5 mr-2" />{t('Features')}</Link></li> */}
                            <li><Link href="/blog"><NewspaperIcon className="h-5 w-5 mr-2" />{t('Blog')}</Link></li>
                            <li><Link href="/blog/about"><FaceSmileIcon className="h-5 w-5 mr-2" />{t('About')}</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl" href='/ai-text-generator'>AI-Text<PencilIcon className="h-5 w-5 mr-2"/></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/"><HomeIcon className="h-5 w-5 mr-2" />{t('Home')}</Link></li>
                        <li><Link href="/blog"><NewspaperIcon className="h-5 w-5 mr-2" />{t('Blog')}</Link></li>
                        <li><Link href="/blog/about"><FaceSmileIcon className="h-5 w-5 mr-2" />{t('About')}</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <NotificationBellWrapper />
                    <div className="ml-3">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </>
    );
}