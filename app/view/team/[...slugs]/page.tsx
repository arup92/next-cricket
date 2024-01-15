import CenteredArea from "@/components/customUi/CenteredArea"
import TeamDetailedStats from "@/components/view/TeamDetailedStats"
import prismaClient from "@/libs/prismadb"
import { capitalizeFullName } from "@/utils/style"
import { Metadata } from "next"
import { cache } from "react"

type Props = {
    params: { slugs: string }
}

const getTeam = cache(async (params: any) => {
    const team = await prismaClient.team.findUnique({
        where: {
            teamId: params.slugs[0].toUpperCase()
        }
    })

    return team
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const team = await getTeam(params)

    let title = `${team?.teamName} Most Recent Statstics | ${process.env.APP_NAME}`
    if (params.slugs[1] && params.slugs[1] !== 'all') {
        title = `${team?.teamId} vs ${params.slugs[1].toUpperCase()} Most Recent Statstics | ${process.env.APP_NAME}`
    }

    let description = `${team?.teamName} Most Recent International Cricket Statstics | ${process.env.APP_NAME}`

    return {
        title,
        description
    }
}

const Venue = async ({ params }: { params: { slugs: string } }) => {
    const team = await getTeam(params)

    return (
        <CenteredArea maxWidthClass="max-w-6xl">
            <TeamDetailedStats
                team={team}
                opponent={params.slugs[1]}
                matchFormat={params.slugs[2]}
                venueId={params.slugs[3]}
            />
        </CenteredArea>
    )
}

export default Venue
