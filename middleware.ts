import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['tr', 'en'],
  defaultLocale: 'tr'
});

export const config = {
  // api, _next ve statik dosyaları next-intl yönlendirmesinden muaf tutar
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/([a-z]{2})/:path*']
};