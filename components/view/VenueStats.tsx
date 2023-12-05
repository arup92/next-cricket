'use client'
import Loading from "@/app/loading"
import { formatDateString } from "@/utils/utils"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { BiSolidCricketBall } from "react-icons/bi"
import { GiCricketBat, GiFastArrow, GiFlameSpin } from "react-icons/gi"
import { HiExternalLink } from 'react-icons/hi'
import { Card, CardContent } from "../ui/card"
import VenueSummery from "./venue/VenueSummery"

interface VenueStatsProps {
    venue: string
}

const VenueStats: React.FC<VenueStatsProps> = ({ venue }) => {

    const getVenueStats = async () => {
        return await axios.get(`/api/view/venue-get/${venue}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    const { data, isLoading } = useQuery({
        queryKey: ['venueStats', venue],
        queryFn: getVenueStats
    })

    if (isLoading)
        return <Loading />

    return (
        <>
            <h2 className="text-2xl mb-4">Most Recent Performance in <span className="capitalize font-semibold">{venue}</span></h2>
            {data?.matches.length > 0 && <VenueSummery matchData={data.matches} />}
            {data?.matches.length > 0 && data.matches.map((match: any, index: any) => {
                let highestScore: number = 0
                let highestWickets: number = 0
                let highestWicketsEco: number = Number.MAX_SAFE_INTEGER
                let bowlingType: string = ''

                return <Card key={index} className="mb-4 relative">
                    <div className="absolute -top-1 -right-1 lg:-top-3 lg:-right-3 bg-white rounded-sm border shadow-sm px-1">
                        <Link href={`../match?matchId=${match.id}`}><HiExternalLink className='inline mb-[3px]' /></Link>
                    </div>
                    <CardContent className="p-3 flex items-center justify-between">
                        <div className="block lg:flex lg:items-center lg:justify-between lg:w-[30%]">
                            <div className="px-5 flex items-center justify-between mb-2 lg:mb-0">
                                <p className="text-lg mr-2">{match.Scores[0].teamId}</p>
                                <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">
                                    {match.Scores[0].runs}/{match.Scores[1].wickets}
                                </p>
                            </div>
                            <span className="text-muted-foreground text-sm hidden lg:block">VS</span>
                            <div className="px-5 flex items-center justify-between flex-row-reverse lg:flex-row">
                                <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">
                                    {match.Scores[1].runs}/{match.Scores[0].wickets}
                                </p>
                                <p className="text-lg mr-2 lg:ml-2">{match.Scores[1].teamId}</p>
                            </div>
                        </div>

                        <div className="lg:w-[20%] text-center">
                            <span className="text-muted-foreground text-sm px-1 border-b rounded shadow-sm">
                                {match.matchFormat} / {formatDateString(match.matchDate)}
                            </span>
                        </div>

                        <div className="lg:w-[20%]">
                            <div className="flex items-center justify-center">
                                <GiCricketBat className='inline mr-1 text-gray-800' />
                                {match.result === match.batFirst ? (
                                    <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-emerald-600 text-white">W</p>
                                ) : (
                                    <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-red-600 text-white">L</p>
                                )}
                            </div>
                        </div>

                        <div className="lg:w-[15%]">
                            <div className="flex items-center justify-center">
                                <GiCricketBat className='inline mr-1 text-gray-800' />
                                {match.batting.forEach((bat: any) => {
                                    if (bat.run > highestScore) {
                                        highestScore = bat.run
                                    }
                                })}
                                <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">{highestScore}</p>
                            </div>
                        </div>

                        <div className="lg:w-[15%]">
                            <div className="flex items-center justify-end">
                                <BiSolidCricketBall className='inline mr-1 text-gray-800' />
                                {match.bowling.forEach((bowl: any) => {
                                    if (bowl.wicket >= highestWickets) {
                                        highestWickets = bowl.wicket
                                        highestWicketsEco = highestWicketsEco < bowl.eco ? highestWicketsEco : bowl.eco
                                        bowlingType = highestWicketsEco < bowl.eco ? bowl.Player.bowlingType : bowlingType
                                    }
                                })}
                                <p className="text-muted-foreground text-sm px-1 mr-1 border rounded shadow-sm">
                                    {highestWickets}/{highestWicketsEco.toFixed(1)}
                                </p>
                                {bowlingType === 'Fast' && <GiFastArrow />}
                                {bowlingType === 'Spin' && <GiFlameSpin />}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            })}
        </>
    )
}

export default VenueStats
