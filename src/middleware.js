import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en'
});

export default function middleware(request) {
  const response = intlMiddleware(request);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/', '/(zh|en)/:path*']
};