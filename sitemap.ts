import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const appUrl = process.env.APP_URL

    return [
        {
            url: `${appUrl}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${appUrl}/view/create-new-11`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]
}