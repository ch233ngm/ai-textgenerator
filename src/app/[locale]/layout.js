import Navigation from '../../components/nav/Navigation'
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

      <html lang={locale} data-theme="light">
        <body>
          <header>
            <Navigation />
          </header>
          <main>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </main>
          <GoogleAnalytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
