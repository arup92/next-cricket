import PlayerView from "@/components/view/PlayerView"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `View Player Stats | ${process.env.APP_NAME}`,
    description: 'View Player Stats',
}

const Player = () => {
    return (
        <PlayerView />
    )
}

export default Player
