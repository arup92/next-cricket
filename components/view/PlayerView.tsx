'use client'
import Loading from "@/app/loading"
import SecNotFound from "@/app/not-found-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getLeagueName, moveToFront } from "@/utils/utils"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import CenteredArea from "../customUi/CenteredArea"
import { Card, CardContent } from "../ui/card"
import BattingTable from "./player/BattingTable"
import BowlingTable from "./player/BowlingTable"
import PlayerData from "./player/PlayerData"
import NotFound404 from "@/app/not-found"

interface PlayerViewProps {
    playerId: string
    matchFormat: string
}

const PlayerView: React.FC<PlayerViewProps> = ({ playerId, matchFormat }) => {
    const [data, setData] = useState<any>()
    const getPlayerStats = async () => {
        return await axios.get(`/api/view/player-get?playerId=${playerId}`)
            .then((response) => {
                setData(response.data)
                return response.data
            })
            .catch((error) => {
                throw new Error("Error Occured")
            })
    }

    let { data: playerStats, isLoading, isError } = useQuery({
        queryKey: ['playerStats', playerId, matchFormat],
        queryFn: getPlayerStats
    })

    useEffect(() => {
        if (playerStats) {
            setData(playerStats)
        }
    }, [playerStats])

    // Filter data
    const updateData = (filteredData: any) => {
        setData(filteredData)
    }

    // Error and Loading
    if (isError) return <NotFound404 />
    if (isLoading) return <Loading />

    // Bat and bowl data on different matchformat
    let groupedData: any = {}
    let matchFormats: any = new Set()
    let rankObject: any = {}

    if (data && data.rank) {
        data.rank.forEach((item: any) => {
            rankObject[item.matchId] = item.rank
        })
    }

    if (data && data.batting) {
        data.batting.forEach((item: any) => {
            // Add the rank
            item.rank = rankObject[item.matchId]

            matchFormats.add(item.matchFormat)
            groupedData.bat ??= {}
            groupedData.bat[item.matchFormat] ??= []
            groupedData.bat[item.matchFormat].push(item)
        })
    }

    if (data && data.bowling) {
        data.bowling.forEach((item: any) => {
            // Add the rank
            item.rank = rankObject[item.matchId]

            matchFormats.add(item.matchFormat)
            groupedData.bowl ??= {}
            groupedData.bowl[item.matchFormat] ??= []
            groupedData.bowl[item.matchFormat].push(item)
        })
    }

    // Convert to array and then sort
    matchFormats = Array.from(matchFormats)
    matchFormats = moveToFront(matchFormats, 'IPL')
    matchFormats = moveToFront(matchFormats, 'T20')
    matchFormats = moveToFront(matchFormats, 'ODI')

    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            {data && <>
                <div className="mb-2 text-sm text-right text-muted-foreground">Displaying Recent Statistics</div>
                {data.playerData && <PlayerData updateData={updateData} playerData={data.playerData} />}

                {data.batting.length === 0 && data.bowling.length === 0 && <SecNotFound />}

                <Accordion type="multiple" defaultValue={[matchFormat]}>
                    <AccordionItem value="recent" className="border-b-0">
                        <Card className="mb-3">
                            <CardContent className="py-3">
                                <AccordionTrigger className="p-0 hover:text-blue-700">
                                    <div className="flex items-center">
                                        <span className="inline mr-1 text-lg font-bold capitalize">Recent Matches</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    {data.batting && <BattingTable
                                        batData={data.batting.slice(0, 10)}
                                    />}
                                    {data.bowling && <BowlingTable
                                        bowlData={data.bowling.slice(0, 10)}
                                    />}
                                </AccordionContent>
                            </CardContent>
                        </Card>
                    </AccordionItem>

                    {matchFormats.map((item: string) => (
                        <AccordionItem key={item} value={item.toLowerCase()} className="border-b-0">
                            <Card className="mb-3">
                                <CardContent className="py-3">
                                    <AccordionTrigger className="p-0 hover:text-blue-700">
                                        <div className="flex items-center">
                                            <span className="inline mr-1 text-lg font-bold capitalize">{getLeagueName(item)}</span>
                                            <span className="inline text-sm text-muted-foreground">(Recent Performances)</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="mt-4">
                                        {groupedData.bat && groupedData.bat.hasOwnProperty(item) && <BattingTable
                                            batData={groupedData?.bat[item].slice(0, 10)}
                                        />}
                                        {groupedData.bowl && groupedData.bowl.hasOwnProperty(item) && <BowlingTable
                                            bowlData={groupedData?.bowl[item].slice(0, 10)}
                                        />}
                                    </AccordionContent>
                                </CardContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            </>}
        </CenteredArea>
    )
}

export default PlayerView
