'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import CenteredArea from "../customUi/CenteredArea"
import BattingTable from "./player/BattingTable"
import PlayerData from "./player/PlayerData"
import BowlingTable from "./player/BowlingTable"

interface PlayerViewProps {
    playerId?: string
}

const PlayerView: React.FC<PlayerViewProps> = ({ playerId }) => {
    const searchParams = useSearchParams()
    let playerIdParam: string = ``

    if (playerId) {
        playerIdParam = playerId
    } else {
        playerIdParam = searchParams.get('playerId') as string
    }

    const getPlayerStats = async () => {
        return await axios.get(`/api/view/player-get?playerId=${playerIdParam}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    const { data } = useQuery({
        queryKey: ['playerStats', playerIdParam],
        queryFn: getPlayerStats
    })

    return (
        <>
            {!playerId ? (
                <CenteredArea maxWidthClass="max-w-5xl">
                    {data && <>
                        <PlayerData playerData={data.playerData} />
                        <BattingTable batData={data.batData} />
                        <BowlingTable bowlData={data.bowlData} />
                    </>}
                </CenteredArea>
            ) : (
                <>
                    {data && <div className="space-y-4">
                        <BattingTable batData={data.batData} />
                        <BowlingTable bowlData={data.bowlData} />
                    </div>}
                </>
            )}
        </>
    )
}

export default PlayerView
