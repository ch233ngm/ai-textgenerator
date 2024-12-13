import Navigation from '../../components/nav/Navigation'
import '../globals.css'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export default async function RootLayout({ children , params  }) {
  const {locale} = await params;
  const messages = await getMessages();
  return (
    <html lang={locale} data-theme="light">
      <body>
        <header>
          <Navigation/>
        </header>
        <main>
        <NextIntlClientProvider messages={messages}>
          {children}
          </NextIntlClientProvider>
          </main>
      </body>
    </html>
  );
}
