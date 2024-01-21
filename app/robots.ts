import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const appUrl = process.env.APP_URL
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/dashboard/',
        },
        sitemap: `${appUrl}/sitemap.xml`,
    }
}