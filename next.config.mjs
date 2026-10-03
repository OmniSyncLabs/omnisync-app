import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextMode} */
const nextConfig = {};

export default withNextIntl(nextConfig);