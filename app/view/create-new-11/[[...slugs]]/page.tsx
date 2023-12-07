import New11ViewV2 from "@/components/view/New11ViewV2"
import { Metadata } from "next"

type Props = {
    params: { slugs: any }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    let title = 'View Team Statistics'
    if (params && params.slugs?.length > 0) {
        title = `${params.slugs[0].toUpperCase()} vs ${params.slugs[1].toUpperCase()} Most recent ${params.slugs[2].toUpperCase()} stats`

        if (params?.slugs[3]) {
            title += ` in ${params.slugs[3]}`
        }
    }

    return {
        title
    }
}

const New11 = ({ params }: { params: { slugs: string } }) => {
    return (
        <New11ViewV2 slugs={params.slugs} />
    )
}

export default New11
