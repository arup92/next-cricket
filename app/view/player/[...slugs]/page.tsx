import PlayerView from "@/components/view/PlayerView"
import { capitalizeFullName } from "@/utils/style"
import { Metadata } from "next"

type Props = {
    params: { slugs: any }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const playerName = capitalizeFullName(params.slugs[0].replaceAll('_', ' '))

    let title = `${playerName} Most Recent Statstics | ${process.env.APP_NAME}`
    let description = `${playerName} Most Recent International Cricket Statistics | ${process.env.APP_NAME}`

    if (params.slugs[1]) {
        title = `${playerName} Most Recent ${params.slugs[1]} Statstics | ${process.env.APP_NAME}`
        description = `${playerName} Most Recent ${params.slugs[1]} Statstics | ${process.env.APP_NAME}`
    }

    return {
        title,
        description
    }
}

const Player = ({ params }: Props) => {
    if (params?.slugs[1] === 't20i') {
        params.slugs[1] = 't20'
    }

    if (!params?.slugs[1]) {
        params.slugs[1] = 'odi'
    }

    return (
        <PlayerView playerId={params.slugs[0]} matchFormat={params?.slugs[1].toLowerCase()} />
    )
}

export default Player
