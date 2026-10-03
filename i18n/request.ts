import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !hasLocale(['tr', 'en'], locale)) {
    locale = 'tr';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});