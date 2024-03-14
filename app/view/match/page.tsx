import MatchTable from "@/components/view/MatchTable"
import prismaClient from "@/libs/prismadb"
import { formatDateString } from "@/utils/utils"
import { Match } from "@prisma/client"
import { Metadata } from "next"
import { cache } from "react"

// export const metadata: Metadata = {
//     title: `Match | ${process.env.APP_NAME}`,
//     description: 'View Match',
// }

type Props = {
    params: { slugs: string }
    searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {

    let match: Match | any = {}

    if (searchParams?.matchId) {
        match = await prismaClient.match.findUnique({
            where: {
                id: parseInt(searchParams.matchId)
            },
            include: {
                venue: true
            }
        })
    }

    let title = `Match | ${process.env.APP_NAME}`
    let description = `Match | ${process.env.APP_NAME}`

    if (!!match) {
        title = `${match?.teamAId} vs ${match?.teamBId.toUpperCase()} in ${match?.venue.venueName} - ${formatDateString(match?.matchDate as unknown as string)} | ${process.env.APP_NAME}`
        description = `${match?.teamAId} vs ${match?.teamBId.toUpperCase()} in ${match?.venue.venueName} - ${formatDateString(match?.matchDate as unknown as string)} match details | ${process.env.APP_NAME}`
    }

    return {
        title,
        description
    }
}

const Match = () => {
    return (
        <MatchTable />
    )
}

export default Match
