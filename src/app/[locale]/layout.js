import Navigation from '../../components/nav/Navigation'
import Footer from '../../components/Footer'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ViewTransitions } from 'next-view-transitions'
import GoogleAnalytics from '../../components/GoogleAnalytics';


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
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <body>
          <header>
            <NextIntlClientProvider messages={messages}>
              <Navigation />
            </NextIntlClientProvider>
          </header>
          <main>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </main>
          <Footer />
          <GoogleAnalytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
