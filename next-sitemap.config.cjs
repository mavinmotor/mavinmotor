const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://mavinmotor.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: SITE_URL,
    generateRobotsTxt: true,
    exclude: ['/pages-sitemap.xml', '/products-sitemap.xml', '/*', '/products/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: '/admin/*',
            },
        ],
        additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/products-sitemap.xml`]
    },
}