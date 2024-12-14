'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { LanguageIcon } from '@heroicons/react/24/outline';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

  const changeLanguage = (newLocale) => {
    // 替换路径中的语言部分
    const newPathname = pathname.replace(new RegExp(`^/${locale}`), `/${newLocale}`);

    // 保留现有的查询参数
    const params = new URLSearchParams(searchParams);
    const query = params.toString();

    // 构建新的 URL，包括路径和查询参数
    const newUrl = query ? `${newPathname}?${query}` : newPathname;

    router.push(newUrl);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <LanguageIcon className="h-5 w-5" />
      </label>
      <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
        <li>
          <a 
            onClick={() => changeLanguage('en')}
            className={locale === 'en' ? 'active' : ''}
          >
            English
          </a>
        </li>
        <li>
          <a 
            onClick={() => changeLanguage('zh')}
            className={locale === 'zh' ? 'active' : ''}
          >
            中文
          </a>
        </li>
        <li>
          <a 
            onClick={() => changeLanguage('fr')}
            className={locale === 'fr' ? 'active' : ''}
          >
            Français
          </a>
        </li>
      </ul>
    </div>
  );
}