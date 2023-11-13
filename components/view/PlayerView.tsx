'use client'
import Loading from "@/app/loading"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import NotFound from "../NotFound"
import CenteredArea from "../customUi/CenteredArea"
import BattingTable from "./player/BattingTable"
import BowlingTable from "./player/BowlingTable"
import PlayerData from "./player/PlayerData"

interface PlayerViewProps {
    playerId?: string
    matchFormat?: string
}

const PlayerView: React.FC<PlayerViewProps> = ({ playerId, matchFormat }) => {
    const searchParams = useSearchParams()
    let playerIdParam: string = ``
    let matchFormatParam: string = ``

    if (playerId && matchFormat) {
        playerIdParam = playerId
        matchFormatParam = matchFormat
    } else {
        playerIdParam = searchParams.get('playerId') as string
        matchFormatParam = searchParams.get('matchFormat') as string
    }

    const getPlayerStats = async () => {
        return await axios.get(`/api/view/player-get?playerId=${playerIdParam}&matchFormat=${matchFormatParam}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    const { data, isLoading } = useQuery({
        queryKey: ['playerStats', playerIdParam],
        queryFn: getPlayerStats
    })

    if (isLoading)
        return (
            <Loading />
        )

    if (!data.batData && !data.bowlData)
        return <NotFound />

    return (
        <>
            {!playerId ? (
                <CenteredArea maxWidthClass="max-w-5xl">
                    {data && <>
                        {data.playerData && <PlayerData playerData={data.playerData} />}
                        {data.batData && <BattingTable batData={data.batData} />}
                        {data.bowlData && <BowlingTable bowlData={data.bowlData} />}
                    </>}
                </CenteredArea>
            ) : (
                <>
                    {data && <div className="space-y-4">
                        {data.batData && <BattingTable batData={data.batData} />}
                        {data.batData && <BowlingTable bowlData={data.bowlData} />}
                    </div>}
                </>
            )}
        </>
    )
}

export default PlayerView
