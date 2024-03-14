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
import { HiExternalLink } from "react-icons/hi"
import TeamMatchFilterForm from "../forms/TeamMatchFilterForm"
import { Card, CardContent } from "../ui/card"
import VenueSummery from "./venue/VenueSummery"

interface TeamDetailedStatsProps {
    team: any
    opponent: string
    matchFormat?: string
    venueId: string
}

const TeamDetailedStats: React.FC<TeamDetailedStatsProps> = ({ team, opponent, matchFormat, venueId }) => {

    const [teamDetailedStats, setTeamDetailedStats] = useState<any>()

    const getTeamDetailedStats = async () => {
        let opponentTeam = opponent ? `/${opponent}` : `/all`
        let format = matchFormat ? `/${matchFormat}` : `/all`
        let venue = !!venueId ? `/${venueId}` : ``

        return await axios.get(`/api/view/stats-team-detailed/${team.teamId}${opponentTeam}${format}${venue}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    const { data, isLoading } = useQuery({
        queryKey: ['teamDetailedStats', team.teamId, opponent, matchFormat, venueId],
        queryFn: getTeamDetailedStats
    })

    useEffect(() => {
        if (data) {
            setTeamDetailedStats(data)
        }
    }, [data])

    if (isLoading)
        return <Loading />

    if (teamDetailedStats && teamDetailedStats.length <= 0)
        return <>
            <Card className=" mb-4">
                <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-baseline">
                        {(opponent && opponent !== 'all') ?
                            <h2 className="text-base lg:text-2xl mr-1"><span className="capitalize font-semibold">{team.teamId} vs {opponent.toUpperCase()}</span> Most Recent Matches</h2>
                            :
                            <h2 className="text-base lg:text-2xl mr-1"><span className="capitalize font-semibold">{team.teamName}</span> Most Recent Matches</h2>
                        }

                        <p className="inline text-muted-foreground text-sm">(Recent Performances)</p>
                    </div>

                    <TeamMatchFilterForm team={team} />
                </CardContent>
            </Card>
            <SecNotFound />
        </>

    return (
        <>
            <Card className=" mb-4">
                <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-baseline">
                        {(opponent && opponent !== 'all') ?
                            <h2 className="text-base lg:text-2xl mr-1"><span className="capitalize font-semibold">{team.teamId} vs {opponent.toUpperCase()}</span> Most Recent Matches</h2>
                            :
                            <h2 className="text-base lg:text-2xl mr-1"><span className="capitalize font-semibold">{team.teamName}</span> Most Recent Matches</h2>
                        }

                        <p className="inline text-muted-foreground text-sm">(Recent 10 Records)</p>
                    </div>

                    <TeamMatchFilterForm team={team} />
                </CardContent>
            </Card>

            {/* {teamDetailedStats && teamDetailedStats?.length > 0 && <VenueSummery matchData={teamDetailedStats} />} */}

            <div className="relative border-b rounded-md border text-card-foreground shadow-sm bg-card mb-3 hidden lg:block">
                <div className="lg:px-3 py-1 lg-py-0 lg:flex items-center justify-between">
                    <div className="pb-2 lg:pb-0 block lg:flex lg:items-center lg:justify-center lg:w-[30%]">
                        <span className="text-muted-foreground text-sm">
                            Match
                        </span>
                    </div>

                    <div className="flex lg:block justify-center items-center px-3 py-1 lg:px-0 lg:w-[15%] lg:text-center border-t border-b lg:border-0">
                        <span className="text-muted-foreground text-sm">
                            Format / Date
                        </span>
                    </div>

                    <div className="flex lg:block justify-center items-center px-3 py-1 lg:px-0 lg:w-[15%] lg:text-center border-t border-b lg:border-0">
                        <span className="text-muted-foreground text-sm">
                            Venue
                        </span>
                    </div>

                    <div className="px-3 lg:px-0 pt-2 lg:py-0 lg:w-[40%] flex justify-between">
                        <div className="flex items-center justify-center lg:w-[25%]">
                            <span className="text-muted-foreground text-sm">
                                Result
                            </span>
                        </div>

                        <div className="flex items-center justify-center lg:w-[25%]">
                            <span className="text-muted-foreground text-sm">
                                Bat First
                            </span>
                        </div>

                        <div className="flex items-center justify-center lg:w-[25%]">
                            <span className="text-muted-foreground text-sm">
                                Top Batting
                            </span>
                        </div>

                        <div className="flex items-center justify-end lg:w-[25%]">
                            <span className="text-muted-foreground text-sm">
                                Top Bowling
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                {teamDetailedStats && teamDetailedStats?.length > 0 && teamDetailedStats.map((match: any, index: any) => {
                    let highestScore: number = 0
                    let highestWickets: number = 0
                    let highestWicketsEco: number = Number.MAX_SAFE_INTEGER
                    let bowlingType: string = ''

                    return <div key={index} className="relative border-b rounded-md border text-card-foreground shadow-sm  bg-card mb-3">
                        <div className="absolute bg-card -top-1 -right-1 lg:-top-3 lg:-right-3 rounded-sm border shadow-sm px-1 hidden lg:block">
                            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/view/match?matchId=${match.id}`}><HiExternalLink className='mb-[3px]' /></Link>
                        </div>
                        <div className="lg:p-3 py-2 lg-py-0 lg:flex items-center justify-between">
                            <div className="pb-2 lg:pb-0 block lg:flex lg:items-center lg:justify-between lg:w-[30%]">
                                {match.batFirst === match?.Scores[0]?.teamId ? <div className="px-3 flex items-center justify-between mb-2 lg:mb-0">
                                    <p className="text-base lg:text-lg mr-2">{match?.Scores[0]?.teamId}</p>
                                    <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">
                                        {match?.Scores[0]?.runs}/{match?.Scores[1]?.wickets}
                                    </p>
                                </div>
                                    :
                                    <div className="px-3 flex items-center justify-between flex-row-reverse lg:flex-row">
                                        <p className="text-base lg:text-lg mr-2">{match?.Scores[1]?.teamId}</p>
                                        <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">
                                            {match?.Scores[1]?.runs}/{match?.Scores[0]?.wickets}
                                        </p>
                                    </div>
                                }

                                <span className="text-muted-foreground text-sm hidden text-center lg:block">
                                    VS
                                </span>

                                {match.batFirst === match?.Scores[1]?.teamId ? <div className="px-3 flex items-center justify-between mb-2 lg:mb-0">
                                    <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm mr-2">
                                        {match?.Scores[0]?.runs}/{match?.Scores[1]?.wickets}
                                    </p>
                                    <p className="text-base lg:text-lg">{match?.Scores[0]?.teamId}</p>
                                </div>
                                    :
                                    <div className="px-3 flex items-center justify-between flex-row-reverse lg:flex-row">
                                        <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">
                                            {match?.Scores[1]?.runs}/{match?.Scores[0]?.wickets}
                                        </p>
                                        <p className="text-base lg:text-lg lg:ml-2">{match?.Scores[1]?.teamId}</p>
                                    </div>
                                }
                            </div>

                            <div className="flex lg:block justify-between items-center px-3 py-1 lg:px-0 lg:w-[15%] lg:text-center border-t border-b lg:border-0">
                                <span className="leading-none text-muted-foreground text-sm lg:px-1 lg:border-b lg:rounded lg:shadow-sm">
                                    {match.matchFormat} / {formatDateString(match.matchDate)}
                                </span>

                                <span className="lg:hidden leading-none text-muted-foreground text-sm lg:px-1">
                                    {match.venue.venueName}, {match.venue.venueCountryId}
                                </span>

                                <Link
                                    className="text-sm lg:hidden text-blue-700 hover:underline"
                                    href={`${process.env.NEXT_PUBLIC_APP_URL}/view/match?matchId=${match.id}`}
                                >
                                    Match Details
                                </Link>
                            </div>

                            <div className="hidden lg:block justify-between items-center px-3 py-1 lg:px-0 lg:w-[15%] lg:text-center border-t border-b lg:border-0">
                                <span className="leading-none text-muted-foreground text-sm lg:px-1">
                                    {match.venue.venueName}, {match.venue.venueCountryId}
                                </span>
                            </div>

                            <div className="px-3 lg:px-0 pt-2 lg:py-0 lg:w-[40%] flex justify-between">
                                <div className="flex justify-center lg:w-[25%]">
                                    <p className="text-sm mr-2 lg:hidden">Result:</p>
                                    {(opponent && opponent !== 'all') ?
                                        <div className="text-muted-foreground text-sm px-1 border rounded shadow-sm">
                                            {match.result}
                                        </div>
                                        :
                                        match.result === team.teamId.toUpperCase() ? (
                                            <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-emerald-600 text-white">W</p>
                                        ) : (
                                            <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-red-600 text-white">L</p>
                                        )
                                    }
                                </div>

                                <div className="flex items-center justify-center lg:w-[25%]">
                                    <p className="text-sm mr-2 lg:hidden">Bat First:</p>
                                    {match.result === match.batFirst ? (
                                        <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-emerald-600 text-white">W</p>
                                    ) : (
                                        <p className="rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase bg-red-600 text-white">L</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-center lg:w-[25%]">
                                    <GiCricketBat className='inline mr-1 text-gray-800' />
                                    {match.batting.forEach((bat: any) => {
                                        if (bat.run > highestScore) {
                                            highestScore = bat.run
                                        }
                                    })}
                                    <p className="text-muted-foreground text-sm px-1 border rounded shadow-sm">{highestScore}</p>
                                </div>

                                <div className="flex items-center justify-end lg:w-[25%]">
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

export default TeamDetailedStats
