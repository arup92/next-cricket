'use client'

import Loading from "@/app/loading"
import SecNotFound from "@/app/not-found-section"
import { formatDateString } from "@/utils/utils"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BiSolidCricketBall } from "react-icons/bi"
import { GiCricketBat, GiFastArrow, GiFlameSpin } from "react-icons/gi"
import { HiExternalLink } from 'react-icons/hi'
import VenueMatchFilterForm from "../forms/VenueMatchFilterForm"
import { Card, CardContent } from "../ui/card"
import VenueSummery from "./venue/VenueSummery"

interface VenueStatsProps {
    venue: string
    matchType?: string
    matchFormat?: string
}

const VenueStats: React.FC<VenueStatsProps> = ({ venue, matchType, matchFormat }) => {

    const [venueStats, setVenueStats] = useState<any>()

    const getVenueStats = async () => {
        let format = matchFormat ? `/${matchFormat}` : ``
        let type = matchType ? `/${matchType}` : ``

        return await axios.get(`/api/view/venue-get/${venue}${format}${type}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    const { data, isLoading } = useQuery({
        queryKey: ['venueStats', venue, matchFormat, matchType],
        queryFn: getVenueStats
    })

    useEffect(() => {
        if (data) {
            setVenueStats(data)
        }
    }, [data])

    if (isLoading)
        return <Loading />

    if (venueStats && venueStats.matches.length <= 0)
        return <>
            <Card className=" mb-4">
                <CardContent className="p-3 flex items-center justify-between">
                    <h2 className="text-base lg:text-2xl">Most Recent Matches in <span className="capitalize font-semibold">{venue.replaceAll('-', ' ')}</span></h2>

                    <VenueMatchFilterForm venueId={venue} />
                </CardContent>
            </Card>
            <SecNotFound />
        </>

    return (
        <>
            <Card className=" mb-4">
                <CardContent className="p-3 flex items-center justify-between">
                    <h2 className="text-base lg:text-2xl">Most Recent Matches in <span className="capitalize font-semibold">{venue.replaceAll('-', ' ')}</span></h2>

                    <VenueMatchFilterForm venueId={venue} />
                </CardContent>
            </Card>

            {venueStats && venueStats?.matches.length > 0 && <VenueSummery matchData={venueStats.matches} />}

            <div className="mb-4">
                {venueStats && venueStats?.matches.length > 0 && venueStats.matches.map((match: any, index: any) => {
                    let highestScore: number = 0
                    let highestWickets: number = 0
                    let highestWicketsEco: number = Number.MAX_SAFE_INTEGER
                    let bowlingType: string = ''

                    return <div key={index} className="relative border-b rounded-md border text-card-foreground shadow-sm  bg-card mb-3">
                        <div className="absolute bg-card -top-1 -right-1 lg:-top-3 lg:-right-3 rounded-sm border shadow-sm px-1">
                            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/view/match?matchId=${match.id}`}><HiExternalLink className='inline mb-[3px]' /></Link>
                        </div>
                        <div className="lg:p-3 py-2 lg-py-0 lg:flex items-center justify-between">
                            <div className="pb-1 lg:pb-0 block lg:flex lg:items-center lg:justify-between lg:w-[30%]">
                                <div className="px-3 flex items-center justify-between mb-2 lg:mb-0">
                                    <p className="text-base lg:text-lg mr-2">{match?.Scores[0]?.teamId}</p>
                                    <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">
                                        {match?.Scores[0]?.runs}/{match?.Scores[1]?.wickets}
                                    </p>
                                </div>

                                <span className="text-muted-foreground text-sm hidden lg:block ">
                                    VS
                                </span>

                                <div className="px-3 flex items-center justify-between flex-row-reverse lg:flex-row">
                                    <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">
                                        {match?.Scores[1]?.runs}/{match?.Scores[0]?.wickets}
                                    </p>
                                    <p className="text-base lg:text-lg mr-2 lg:ml-2">{match?.Scores[1]?.teamId}</p>
                                </div>
                            </div>

                            <div className="px-3 lg:px-0 lg:w-[30%] lg:text-center border-t border-b lg:border-0">
                                <span className="text-muted-foreground text-sm lg:px-1 lg:border-b lg:rounded lg:shadow-sm">
                                    {match.matchFormat} / {formatDateString(match.matchDate)}
                                </span>
                            </div>

                            <div className="px-3 lg:px-0 py-1 lg:py-0 lg:w-[40%] flex justify-between">
                                <div className="flex items-center lg:justify-center">
                                    <GiCricketBat className='hidden lg:inline mr-1 text-gray-800' />
                                    <p className="text-sm mr-2 lg:hidden">Bat First:</p>
                                    {match.result === match.batFirst ? (
                                        <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-emerald-600 text-white">W</p>
                                    ) : (
                                        <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-red-600 text-white">L</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-center">
                                    <GiCricketBat className='inline mr-1 text-gray-800' />
                                    {match.batting.forEach((bat: any) => {
                                        if (bat.run > highestScore) {
                                            highestScore = bat.run
                                        }
                                    })}
                                    <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">{highestScore}</p>
                                </div>

                                <div className="flex items-center justify-end">
                                    <BiSolidCricketBall className='inline mr-1 text-gray-800' />
                                    {match.bowling.forEach((bowl: any) => {
                                        if (bowl.wicket >= highestWickets) {
                                            if (bowl.wicket >= highestWickets) {
                                                if (bowl.wicket > highestWickets) {
                                                    highestWicketsEco = bowl.eco
                                                    bowlingType = bowl.Player.bowlingType
                                                }
                                                highestWickets = bowl.wicket
                                                highestWicketsEco = bowl.eco < highestWicketsEco ? bowl.eco : highestWicketsEco
                                                bowlingType = bowl.Player.bowlingType
                                            }
                                        }
                                    })}
                                    <p className="text-muted-foreground text-sm px-1 mr-1 border rounded shadow-sm">
                                        {highestWickets}/{highestWicketsEco.toFixed(1)}
                                    </p>
                                    {bowlingType === 'Fast' && <GiFastArrow />}
                                    {bowlingType === 'Spin' && <GiFlameSpin />}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default VenueStats
