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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "../ui/card"
import PlayerFilterForm from "../forms/PlayerFilterForm"

interface PlayerViewProps {
    playerId: string
    matchFormat?: string
}

const PlayerView: React.FC<PlayerViewProps> = ({ playerId, matchFormat }) => {
    const getPlayerStats = async () => {
        return await axios.get(`/api/view/player-get?playerId=${playerId}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    if (!matchFormat) {
        matchFormat = 'odi'
    }

    const { data, isLoading } = useQuery({
        queryKey: ['playerStats', playerId, matchFormat],
        queryFn: getPlayerStats
    })

    if (isLoading)
        return (
            <Loading />
        )

    if (!data.batData && !data.bowlData)
        return <NotFound />

    // Bat and bowl data on different matchformat
    let ODIBatData: any[] = []
    let ODIBowlData: any[] = []
    let T20BatData: any[] = []
    let T20BowlData: any[] = []
    let IPLBatData: any[] = []
    let IPLBowlData: any[] = []

    if (data.batData) {
        data.batData.forEach((item: any) => {
            if (item.matchFormat === 'ODI') {
                ODIBatData.push(item)
            } else if (item.matchFormat === 'T20') {
                T20BatData.push(item)
            } else if (item.matchFormat === 'IPL') {
                IPLBatData.push(item)
            }
        })

        data.bowlData.forEach((item: any) => {
            if (item.matchFormat === 'ODI') {
                ODIBowlData.push(item)
            } else if (item.matchFormat === 'T20') {
                T20BowlData.push(item)
            } else if (item.matchFormat === 'IPL') {
                IPLBowlData.push(item)
            }
        })
    }

    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            {data && <>
                <div className="text-muted-foreground text-right mb-2 text-sm">Displaying Recent Statistics</div>
                {data.playerData && <PlayerData playerData={data.playerData} />}
                <PlayerFilterForm />

                <Accordion type="multiple" defaultValue={[matchFormat]}>
                    {(ODIBatData.length > 0 || ODIBowlData.length > 0) && <AccordionItem value="odi" className="border-b-0">
                        <Card className="mb-3">
                            <CardContent className="py-3">
                                <AccordionTrigger className="p-0 hover:text-blue-700">
                                    <span className="capitalize inline font-bold text-lg">ODI Career</span>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    {data.batData && <BattingTable
                                        batData={ODIBatData.slice(0, 10)}
                                    />}
                                    {data.bowlData && <BowlingTable
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
                                    <span className="capitalize inline font-bold text-lg">T20 Career</span>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    {data.batData && <BattingTable
                                        batData={T20BatData.slice(0, 10)}
                                    />}
                                    {data.bowlData && <BowlingTable
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
                                    <span className="capitalize inline font-bold text-lg">IPL Career</span>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    {data.batData && <BattingTable
                                        batData={IPLBatData}
                                    />}
                                    {data.bowlData && <BowlingTable
                                        bowlData={IPLBowlData}
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
