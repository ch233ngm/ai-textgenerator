import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/app/i18n.js');

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'r2-worker.ch233ngm.workers.dev',
                port: '',
                pathname: '/**',
                search: '',
            }
        ],
    }
};
export default withNextIntl(nextConfig);