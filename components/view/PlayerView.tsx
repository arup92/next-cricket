'use client'
import Loading from "@/app/loading"
import SecNotFound from "@/app/not-found-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import CenteredArea from "../customUi/CenteredArea"
import { Card, CardContent } from "../ui/card"
import BattingTable from "./player/BattingTable"
import BowlingTable from "./player/BowlingTable"
import PlayerData from "./player/PlayerData"

interface PlayerViewProps {
    playerId: string
    matchFormat?: string
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
                console.log(error)
                return []
            })
    }

    if (!matchFormat) {
        matchFormat = 'odi'
    }

    let { data: playerStats, isLoading } = useQuery({
        queryKey: ['playerStats', playerId, matchFormat],
        queryFn: getPlayerStats
    })

    useEffect(() => {
        if (playerStats) {
            setData(playerStats)
        }
    }, [playerStats])

    if (isLoading)
        return (
            <Loading />
        )

    // Bat and bowl data on different matchformat
    let ODIBatData: any[] = []
    let ODIBowlData: any[] = []

    let T20BatData: any[] = []
    let T20BowlData: any[] = []

    let IPLBatData: any[] = []
    let IPLBowlData: any[] = []

    let BBLBatData: any[] = []
    let BBLBowlData: any[] = []

    let SSBatData: any[] = []
    let SSBowlData: any[] = []

    if (data && data.batting) {
        data.batting.forEach((item: any) => {
            if (item.matchFormat === 'ODI') {
                ODIBatData.push(item)
            } else if (item.matchFormat === 'T20') {
                T20BatData.push(item)
            } else if (item.matchFormat === 'IPL') {
                IPLBatData.push(item)
            } else if (item.matchFormat === 'BBL') {
                BBLBatData.push(item)
            } else if (item.matchFormat === 'SS') {
                SSBatData.push(item)
            }
        })
    }

    if (data && data.bowling) {
        data.bowling.forEach((item: any) => {
            if (item.matchFormat === 'ODI') {
                ODIBowlData.push(item)
            } else if (item.matchFormat === 'T20') {
                T20BowlData.push(item)
            } else if (item.matchFormat === 'IPL') {
                IPLBowlData.push(item)
            } else if (item.matchFormat === 'BBL') {
                BBLBowlData.push(item)
            } else if (item.matchFormat === 'SS') {
                SSBowlData.push(item)
            }
        })
    }

    const updateData = (filteredData: any) => {
        setData(filteredData)
    }

    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            {data && <>
                <div className="mb-2 text-sm text-right text-muted-foreground">Displaying Recent Statistics</div>
                {data.playerData && <PlayerData updateData={updateData} playerData={data.playerData} />}

                {data.batting.length === 0 && data.bowling.length === 0 && <SecNotFound />}

                <Accordion type="multiple" defaultValue={[matchFormat]}>
                    {(ODIBatData.length > 0 || ODIBowlData.length > 0) && <AccordionItem value="odi" className="border-b-0">
                        <Card className="mb-3">
                            <CardContent className="py-3">
                                <AccordionTrigger className="p-0 hover:text-blue-700">
                                    <span className="inline text-lg font-bold capitalize">ODI Career</span>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    {data.batting && <BattingTable
                                        batData={ODIBatData.slice(0, 10)}
                                    />}
                                    {data.bowling && <BowlingTable
                                        bowlData={ODIBowlData.slice(0, 10)}
                                    />}
                                </AccordionContent>
                            </CardContent>
                        </Card>
                    </AccordionItem>}

                    {(T20BatData.length > 0 || T20BowlData.length > 0) && <AccordionItem value="t20" className="border-b-0">
                        <Card className="mb-3">
                            <CardContent className="py-3">
                                <AccordionTrigger className="p-0 hover:text-blue-700">
                                    <span className="inline text-lg font-bold capitalize">T20I Career</span>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    {data.batting && <BattingTable
                                        batData={T20BatData.slice(0, 10)}
                                    />}
                                    {data.bowling && <BowlingTable
                                        bowlData={T20BowlData.slice(0, 10)}
                                    />}
                                </AccordionContent>
                            </CardContent>
                        </Card>
                    </AccordionItem>}

                    {(IPLBatData.length > 0 || IPLBowlData.length > 0) && <AccordionItem value="t20" className="border-b-0">
                        <Card className="mb-3">
                            <CardContent className="py-3">
                                <AccordionTrigger className="p-0 hover:text-blue-700">
                                    <span className="inline text-lg font-bold capitalize">IPL Career</span>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    {data.batting && <BattingTable
                                        batData={IPLBatData}
                                    />}
                                    {data.bowling && <BowlingTable
                                        bowlData={IPLBowlData}
                                    />}
                                </AccordionContent>
                            </CardContent>
                        </Card>
                    </AccordionItem>}

                    {(BBLBatData.length > 0 || BBLBowlData.length > 0) && <AccordionItem value="t20" className="border-b-0">
                        <Card className="mb-3">
                            <CardContent className="py-3">
                                <AccordionTrigger className="p-0 hover:text-blue-700">
                                    <span className="inline text-lg font-bold capitalize">Big Bash League Career</span>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    {data.batting && <BattingTable
                                        batData={BBLBatData}
                                    />}
                                    {data.bowling && <BowlingTable
                                        bowlData={BBLBowlData}
                                    />}
                                </AccordionContent>
                            </CardContent>
                        </Card>
                    </AccordionItem>}

                    {(SSBatData.length > 0 || SSBowlData.length > 0) && <AccordionItem value="t20" className="border-b-0">
                        <Card className="mb-3">
                            <CardContent className="py-3">
                                <AccordionTrigger className="p-0 hover:text-blue-700">
                                    <span className="inline text-lg font-bold capitalize">Super Smash Career</span>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    {data.batting && <BattingTable
                                        batData={SSBatData}
                                    />}
                                    {data.bowling && <BowlingTable
                                        bowlData={SSBowlData}
                                    />}
                                </AccordionContent>
                            </CardContent>
                        </Card>
                    </AccordionItem>}
                </Accordion>
            </>}
        </CenteredArea>
    )
}

export default PlayerView
