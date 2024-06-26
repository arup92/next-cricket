import NotFound404 from "@/app/not-found"
import NotFound from "@/components/NotFound"
import StatsTeamFormV2 from "@/components/forms/StatsTeamFormV2"
import New11ViewV2 from "@/components/view/New11ViewV2"
import prismaClient from "@/libs/prismadb"
import { Metadata } from "next"
import { cache } from "react"

type Props = {
    params: { slugs: any }
}

const getTeam = cache(async (params: any) => {
    if (params.slugs?.length > 0 && params.slugs[0].toUpperCase() !== params.slugs[1].toUpperCase()) {
        const teams = await prismaClient.team.findMany({
            where: {
                teamId: {
                    in: [params.slugs[0].toUpperCase(), params.slugs[1].toUpperCase()]
                }
            }
        })

        return teams
    }

    return null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    let title = `Make new  11 | ${process.env.APP_NAME}`
    if (params && params.slugs?.length > 0) {
        const teams = await getTeam(params)

        if (teams) {
            title = `${teams[0].teamName} vs ${teams[1].teamName} Most Recent ${params.slugs[2].toUpperCase()} statistics`

            if (params?.slugs[3]) {
                title += ` in ${params.slugs[3].charAt(0).toUpperCase() + params.slugs[3].slice(1)}`
            }
        }
    }

    return {
        title,
        description: title
    }
}

const New11 = async ({ params }: { params: { slugs: string } }) => {
    const teams = await getTeam(params)

    if (!params.slugs?.[0]) {
        return <div className="sm:max-w-[425px] mx-auto my-0">
            <StatsTeamFormV2 slugs={params.slugs as any} />
        </div>
    } else if (!!teams) {
        return <New11ViewV2 slugs={params.slugs} teams={teams} />
    }

    return <NotFound404 />
}

export default New11
