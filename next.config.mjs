import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/app/i18n.js');

const nextConfig = {
    experimental: {
        nextScriptWorkers: true,
        viewTransitions: true,
    }
};
export default withNextIntl(nextConfig);