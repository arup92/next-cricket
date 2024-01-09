import New11ViewV2 from "@/components/view/New11ViewV2"
import prismaClient from "@/libs/prismadb"
import { Metadata } from "next"

type Props = {
    params: { slugs: any }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    let title = `Make new  11 | ${process.env.APP_NAME}`
    if (params && params.slugs?.length > 0) {
        const teams = await prismaClient.team.findMany({
            where: {
                teamId: {
                    in: [params.slugs[0].toUpperCase(), params.slugs[1].toUpperCase()]
                }
            }
        })

        title = `${teams[0].teamName} vs ${teams[1].teamName} Most Recent ${params.slugs[2].toUpperCase()} statistics`

        if (params?.slugs[3]) {
            title += ` in ${params.slugs[3].charAt(0).toUpperCase() + params.slugs[3].slice(1)}`
        }
    }

    return {
        title,
        description: title
    }
}

const New11 = ({ params }: { params: { slugs: string } }) => {
    return (
        <New11ViewV2 slugs={params.slugs} />
    )
}

export default New11
