import Navigation from '../../components/nav/Navigation'
import Footer from '../../components/Footer'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ViewTransitions } from 'next-view-transitions'
import GoogleAnalytics from '../../components/GoogleAnalytics';
import Providers from '../../components/login/Provider';

import GoogleOneTap from '../../components/login/GoogleOneTap';

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <ViewTransitions>
      <html lang={locale} data-theme="light" className="scrollbar-hide">
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <meta name="msvalidate.01" content="147FAF1BA47C381B71AF5E19AA1BCCEC" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1167867040501073"
     crossorigin="anonymous"></script>
      
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <body>
          <header>
            <NextIntlClientProvider messages={messages}>
            <Providers><Navigation /></Providers>
            </NextIntlClientProvider>
          </header>
          <main>
            <NextIntlClientProvider messages={messages}>
              <Providers>
                <GoogleOneTap />
                {children}
              </Providers>
            </NextIntlClientProvider>
          </main>
          <Footer />
          <GoogleAnalytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
