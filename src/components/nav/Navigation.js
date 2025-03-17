"use client";
import { Link } from 'next-view-transitions';
import LanguageSwitcher from './LanguageSwitcher';
import NotificationBellWrapper from './NotificationBellWrapper';
import { useTranslations } from 'next-intl';
import { HomeIcon, FaceSmileIcon, NewspaperIcon, PencilIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { signIn } from "next-auth/react"
export default function Navigation() {
    const { data: session } = useSession();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const image = session?.user?.image;

    const pathname = usePathname();
    // 如果是主页
    const isHomePage = pathname.split('/').length < 3;

    const t = useTranslations('Index');
    const mobileDetailsRef = useRef(null);
    const desktopDetailsRef = useRef(null);
    const dropdownLabelRef = useRef(null);
    const dropdownContentRef = useRef(null);

    const handleLinkClick = (detailsRef) => {
        if (detailsRef.current) {
            detailsRef.current.open = false;
        }
    };

    useEffect(() => {
        if (dropdownLabelRef.current) {
            dropdownLabelRef.current.tabIndex = 0;
        }
        if (dropdownContentRef.current) {
            dropdownContentRef.current.tabIndex = 0;
        }
    }, []);

    useEffect(() => {
        const closeAllDetails = (event) => {
            if (!event.target.closest('.nav-mydetail')) {
                if (mobileDetailsRef.current) {
                    mobileDetailsRef.current.open = false;
                }
                if (desktopDetailsRef.current) {
                    desktopDetailsRef.current.open = false;
                }
            }
        };

        document.addEventListener('click', closeAllDetails);

        return () => {
            document.removeEventListener('click', closeAllDetails);
        };
    }, []);

    return (
        <>
            {!isHomePage && <div className="h-16"></div>} {/* 只在非主页添加间隔 */}
            
            {/* 登录选择模态框 */}
            {showLoginModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={() => setShowLoginModal(false)}>
                    <div className="bg-base-100 p-6 rounded-lg shadow-xl w-80" onClick={(e) => e.stopPropagation()}>
                        <h3 className="font-bold text-lg mb-4">Choose Login Method</h3>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => signIn('google')} className="btn btn-outline">
                                <img src="/static/images/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
                                Sign in with Google
                            </button>
                            <button onClick={() => signIn('github')} className="btn btn-outline">
                                <img src="/static/images/github-icon.svg" alt="GitHub" className="w-5 h-5 mr-2" />
                                Sign in with GitHub
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className={isHomePage ? "navbar fixed top-0 left-0 right-0 z-50 shadow-md bg-base-100/5 backdrop-blur-md text-neutral-content"
                : "navbar fixed top-0 left-0 right-0 z-50 shadow-md bg-base-100"}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label ref={dropdownLabelRef} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul ref={dropdownContentRef} className={isHomePage ?
                            "menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100/5 backdrop-blur-md rounded-box w-52"
                            : "menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"}>
                            <li><Link href="/"><HomeIcon className="h-5 w-5 mr-2" />{t('Home')}</Link></li>
                            <li>
                                <details ref={mobileDetailsRef} className="nav-mydetail">
                                    <summary><WrenchScrewdriverIcon className="h-5 w-5 mr-2" />Tools</summary>
                                    <ul className={isHomePage ? "p-2 bg-base-0 rounded-t-none" : "p-2 bg-base-100 rounded-t-none"}>
                                        <li><Link href="/ai-text-generator" onClick={() => handleLinkClick(mobileDetailsRef)}>{t('textTool')}</Link></li>
                                        <li><Link href="/ai-response-generator" onClick={() => handleLinkClick(mobileDetailsRef)}>{t('responseTool')}</Link></li>
                                        <li role="menuitem"><Link href="/text-to-image" onClick={() => handleLinkClick(desktopDetailsRef)}>Text to Image</Link></li>
                                        <li role="menuitem"><Link href="/all-generated-images" onClick={() => handleLinkClick(desktopDetailsRef)}>Image Gallery</Link></li>
                                    </ul>
                                </details>
                            </li>
                            <li><Link href="/blog"><NewspaperIcon className="h-5 w-5 mr-2" />{t('Blog')}</Link></li>
                            <li><Link href="/blog/about"><FaceSmileIcon className="h-5 w-5 mr-2" />{t('About')}</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl" href='/ai-text-generator'>AI-Text<PencilIcon className="h-5 w-5 mr-2" /></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/"><HomeIcon className="h-5 w-5 mr-2" />{t('Home')}</Link></li>
                        <li>
                            <details ref={desktopDetailsRef} className="nav-mydetail dropdown w-48">
                                <summary aria-haspopup="true" aria-expanded={desktopDetailsRef.current?.open || false}>
                                    <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />AI Text Tools
                                </summary>
                                <ul className={isHomePage ? "p-2 bg-base-100/5 backdrop-blur-md rounded-t-none" : "p-2 bg-base-100 rounded-t-none"} role="menu">
                                    <li role="menuitem"><Link href="/ai-text-generator" onClick={() => handleLinkClick(desktopDetailsRef)}>{t('textTool')}</Link></li>
                                    <li role="menuitem"><Link href="/ai-response-generator" onClick={() => handleLinkClick(desktopDetailsRef)}>{t('responseTool')}</Link></li>
                                    <li role="menuitem"><Link href="/text-to-image" onClick={() => handleLinkClick(desktopDetailsRef)}>Text to Image</Link></li>
                                    <li role="menuitem"><Link href="/all-generated-images" onClick={() => handleLinkClick(desktopDetailsRef)}>Image Gallery</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href="/blog"><NewspaperIcon className="h-5 w-5 mr-2" />{t('Blog')}</Link></li>
                        <li><Link href="/blog/about"><FaceSmileIcon className="h-5 w-5 mr-2" />{t('About')}</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <NotificationBellWrapper />
                    <div className="ml-3">
                        <LanguageSwitcher />
                    </div>
                    {session ? (
                        <div className="dropdown dropdown-end ml-3">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={image} alt="User avatar" />
                                </div>
                            </label>
                            <ul tabIndex={0} className={isHomePage ? 
                                "mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100/5 backdrop-blur-md rounded-box w-52" : 
                                "mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"}>
                                <li><a onClick={() => signOut({ callbackUrl: '/' })}>{t('Logout')}</a></li>
                            </ul>
                        </div>
                    ) : (
                        <button onClick={() => setShowLoginModal(true)} className={isHomePage ? 
                            "btn btn-ghost btn-sm ml-3 border border-primary text-primary hover:bg-primary hover:text-white" : 
                            "btn btn-ghost btn-sm ml-3 border border-primary text-primary hover:bg-primary hover:text-white"}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}