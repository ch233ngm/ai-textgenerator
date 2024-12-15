import createNextIntlPlugin from 'next-intl/plugin';
import  { withContentlayer } from 'next-contentlayer2'

const withNextIntl = createNextIntlPlugin('./src/app/i18n.js');

const nextConfig = {
};
export default withNextIntl(withContentlayer(nextConfig));