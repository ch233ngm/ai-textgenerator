import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'zh', 'fr'],
  defaultLocale: 'en'
});

export default function middleware(request) {
  const response = intlMiddleware(request);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/', '/(zh|en|fr)/:path*']
};