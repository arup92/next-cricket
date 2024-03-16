import { MatchFormat } from './../../types/MatchFormat';
import prismaClient from '@/libs/prismadb'
import { MetadataRoute } from 'next'

export const revalidate = 0

interface SiteMapType {
    url: string
    lastModified?: string | Date | undefined
    changeFrequency?: "monthly" | "always" | "hourly" | "daily" | "weekly" | "yearly" | "never" | undefined
    priority?: number | undefined
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const appUrl = process.env.APP_URL
    /** ------------------------------------------------------------- **/
    const matches = await prismaClient.match.findMany({
        orderBy: {
            matchDate: 'desc'
        }
    })

    const matchesArray: SiteMapType[] = matches.map(match => {
        return {
            url: `${appUrl}/view/match?matchId=${match.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        }
    })
    /** ------------------------------------------------------------- **/

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
        {
            url: `${appUrl}/page/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${appUrl}/page/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${appUrl}/page/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${appUrl}/page/terms-and-conditions`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...matchesArray,
    ]
}