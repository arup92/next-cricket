import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import useReviewCardStore from "@/store/reviewCard"
import useSelectCardStore from "@/store/selectCard"
import useZStore from "@/store/store"
import { fantasyPointColor } from "@/utils/style"
import { makeRankArrayObject } from "@/utils/utils"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useEffect } from "react"
import { BiSolidCricketBall, BiSolidHide, BiSolidShow } from "react-icons/bi"
import { FaPlusCircle } from "react-icons/fa"
import { IoIosStar } from "react-icons/io"
import { MdSportsCricket } from "react-icons/md"
import PlayerPopUpBat from "./Card/PlayerPopUpBat"
import PlayerPopUpBowl from "./Card/PlayerPopUpBowl"

interface SavedPlayerStatsProps {
    playerData: any
    ranks: any[]
    className?: string
    teamId: string
    oppCountryId: string
    matchFormat: string
}

const SavedPlayerStats: React.FC<SavedPlayerStatsProps> = ({ ranks, playerData, className, teamId, oppCountryId, matchFormat }) => {
    const playerRank = makeRankArrayObject(ranks)

    let battingOrder: any = {}
    let bowlingOrder: any = {}
    const playerDataKeys = Object.keys(playerData) // Array of player names

    return (
        <>
            {playerDataKeys.length > 0 && playerDataKeys.map((player: any, index: number) => {
                let totalFantasyPoints: number = 0
                let totalFantasyPointsVsTeam: number = 0
                let totalFantasyPointsInVenue: number = 0
                matchFormat = matchFormat.toUpperCase()

                if (playerData[player].teamId === teamId)
                    return <Card className={`relative ${className}`} key={index}>
                        <CardHeader>
                            <CardTitle className="capitalize">
                                <div className="flex justify-between">
                                    {/* Calculation: Batting order */}
                                    {playerData[player].bat && playerData[player].bat.forEach((inning: any, index: number) => {
                                        if (!!inning.battingOrder) {
                                            battingOrder[player] = inning.battingOrder
                                        }
                                    })}

                                    {/* Calculation: Bowling order */}
                                    {playerData[player].bowl && playerData[player].bowl.forEach((inning: any, index: number) => {
                                        if (!!inning.bowlingOrder) {
                                            bowlingOrder[player] = inning.bowlingOrder
                                        }
                                    })}

                                    <p className="flex items-center">
                                        <Link
                                            className="text-blue-700 hover:underline"
                                            href={`${process.env.NEXT_PUBLIC_APP_URL}/view/player/${player}/${matchFormat}`}
                                        >
                                            {player.replaceAll('_', ' ')}
                                        </Link>

                                        {battingOrder[player] && battingOrder[player] < 8 && <span className="relative p-1 ml-1 mr-1 border rounded-full shadow-sm">
                                            <MdSportsCricket />
                                            <span className="absolute w-[18px] h-[18px] text-center text-xs bg-black text-white border rounded-full -top-[6px] -right-[6px]">{battingOrder[player]}</span>
                                        </span>}

                                        {bowlingOrder[player] && <span className="relative p-1 ml-1 border rounded-full shadow-sm">
                                            <BiSolidCricketBall />
                                            <span className="absolute w-[18px] h-[18px] text-center text-xs bg-black text-white border rounded-full -top-[6px] -right-[6px]">{bowlingOrder[player]}</span>
                                        </span>}
                                    </p>

                                    <p>{teamId}</p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {playerData[player].bat && <div className="px-2 py-1 mb-3 border border-gray-400 rounded-sm">
                                <div className="flex items-center justify-between">
                                    <p>Runs</p>
                                    <div>
                                        {playerData[player].bat && playerData[player].bat.map((inning: any, index: number) => {
                                            let battingClassName = highlightColor(inning, matchFormat, 'batting')

                                            // Fantasy Point
                                            totalFantasyPoints += inning.f11points

                                            return <PlayerPopUpBat key={index} themeclass={battingClassName} inning={inning} />
                                        })}
                                    </div>
                                </div>

                                {playerData[player].batVsTeam && <>
                                    <Separator className="mt-2" />
                                    <div className="flex items-center justify-between pt-1">
                                        <p>Vs {oppCountryId}</p>
                                        <div>
                                            {playerData[player].batVsTeam.map((inning: any, index: number) => {
                                                let battingClassName = highlightColor(inning, matchFormat, 'batting')

                                                // Fantasy Point
                                                totalFantasyPointsVsTeam += inning.f11points

                                                return <PlayerPopUpBat key={index} themeclass={battingClassName} inning={inning} />
                                            })}
                                        </div>
                                    </div>
                                </>}

                                {playerData[player].batInVenue && <>
                                    <Separator className="mt-1" />
                                    <div className="flex items-center justify-between pt-1">
                                        <p>In Venue</p>
                                        <div>
                                            {playerData[player].batInVenue.map((inning: any, index: number) => {
                                                let battingClassName = highlightColor(inning, matchFormat, 'batting')

                                                // Fantasy Point
                                                totalFantasyPointsInVenue += inning.f11points

                                                return <PlayerPopUpBat key={index} themeclass={battingClassName} inning={inning} />
                                            })}
                                        </div>
                                    </div>
                                </>}
                            </div>}

                            {playerData[player].teamId === teamId && playerData[player].bowl && <div className="px-2 py-1 mb-3 border border-gray-300 rounded-sm">
                                <div className="flex justify-between">
                                    <p>Wickets</p>
                                    <div>
                                        {playerData[player].bowl && playerData[player].bowl.map((inning: any, index: number) => {
                                            let bowlingClassName = highlightColor(inning, matchFormat, 'bowling')

                                            // Fantasy Point
                                            totalFantasyPoints += inning.f11points

                                            return <PlayerPopUpBowl key={index} themeclass={bowlingClassName} inning={inning} />
                                        })}
                                    </div>
                                </div>

                                {playerData[player].bowlVsTeam && <>
                                    <Separator className="mt-1" />
                                    <div className="flex justify-between pt-1">
                                        <p>Vs {oppCountryId}</p>
                                        <div>
                                            {playerData[player].bowlVsTeam.map((inning: any, index: number) => {
                                                let bowlingClassName = highlightColor(inning, matchFormat, 'bowling')

                                                // Fantasy Point
                                                totalFantasyPointsVsTeam += inning.f11points

                                                return <PlayerPopUpBowl key={index} themeclass={bowlingClassName} inning={inning} />
                                            })}
                                        </div>
                                    </div>
                                </>}

                                {playerData[player].bowlInVenue && <>
                                    <Separator className="mt-1" />
                                    <div className="flex justify-between pt-1">
                                        <p>In Venue</p>
                                        <div>
                                            {playerData[player].bowlInVenue.map((inning: any, index: number) => {
                                                let bowlingClassName = highlightColor(inning, matchFormat, 'bowling')

                                                // Fantasy Point
                                                totalFantasyPointsInVenue += inning.f11points

                                                return <PlayerPopUpBowl key={index} themeclass={bowlingClassName} inning={inning} />
                                            })}
                                        </div>
                                    </div>
                                </>}
                            </div>}

                            {playerRank[player] && <div className="px-2 py-1 mb-3 border border-gray-400 rounded-sm">
                                <div className="flex items-center justify-between">
                                    <p>Ranks</p>
                                    <div>
                                        {playerRank[player]?.map((item: any, index: number) => {
                                            let bgColor = ''
                                            if (item <= 2) {
                                                bgColor = 'bg-gradient-to-r from-amber-200 to-yellow-500 text-white'
                                            } else if (item <= 11) {
                                                bgColor = 'bg-emerald-500 text-white'
                                            }

                                            return <div className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${bgColor}`} key={index}>{item}</div>
                                        })}
                                    </div>
                                </div>
                            </div>}

                            {totalFantasyPoints && <div className="px-2 py-1 border border-gray-400 rounded-sm">
                                <div className="flex items-center justify-between">
                                    <p>Fantasy Points</p>
                                    <div className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${fantasyPointColor(totalFantasyPoints, matchFormat)}`}>
                                        {totalFantasyPoints}
                                    </div>
                                </div>

                                {totalFantasyPointsVsTeam > 0 && <>
                                    <Separator className="mt-1" />
                                    <div className="flex items-center justify-between pt-1">
                                        <p>Vs {oppCountryId}</p>
                                        <div className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${fantasyPointColor(totalFantasyPointsVsTeam, matchFormat)}`}>
                                            {totalFantasyPointsVsTeam}
                                        </div>
                                    </div>
                                </>}

                                {totalFantasyPointsInVenue > 0 && <>
                                    <Separator className="mt-1" />
                                    <div className="flex items-center justify-between pt-1">
                                        <p>In Venue</p>
                                        <div className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${fantasyPointColor(totalFantasyPointsInVenue, matchFormat)}`}>
                                            {totalFantasyPointsInVenue}
                                        </div>
                                    </div>
                                </>}
                            </div>}
                        </CardContent>
                    </Card >
            })}
        </>
    )
}

function highlightColor(inning: any, matchFormat: string, type: 'batting' | 'bowling'): string {
    let className = ``
    if (matchFormat === 'ODI') {
        if (type === 'batting') {
            if (inning.run >= 100) {
                className = 'text-white shadow bg-emerald-700'
            } else if (inning.run >= 75) {
                className = 'text-white shadow bg-emerald-600'
            } else if (inning.run >= 50) {
                className = 'text-white shadow bg-emerald-500'
            } else if (inning.run >= 40) {
                className = 'shadow bg-emerald-50 text-emerald-700'
            } else if (inning.run <= 9) {
                className = 'bg-gray-200 shadow text-emerald-700'
            }
        } else if (type === 'bowling') {
            if (inning.wicket >= 5) {
                className = 'text-white shadow bg-emerald-700'
            } else if (inning.wicket >= 3) {
                className = 'text-white shadow bg-emerald-600'
            } else if (inning.wicket >= 2) {
                className = 'shadow bg-emerald-50 text-emerald-700'
            } else if (inning.wicket === 0) {
                className = 'bg-gray-200 shadow text-emerald-700'
            }
        }
    } else {
        if (type === 'batting') {
            if (inning.run >= 100) {
                className = 'text-white shadow bg-emerald-700'
            } else if (inning.run >= 75) {
                className = 'text-white shadow bg-emerald-600'
            } else if (inning.run >= 50) {
                className = 'text-white shadow bg-emerald-500'
            } else if (inning.run >= 30) {
                className = 'shadow bg-emerald-50 text-emerald-700'
            } else if (inning.run <= 9) {
                className = 'bg-gray-200 shadow text-emerald-700'
            }
        } else if (type === 'bowling') {
            if (inning.wicket >= 5) {
                className = 'text-white shadow bg-emerald-700'
            } else if (inning.wicket >= 3) {
                className = 'text-white shadow bg-emerald-600'
            } else if (inning.wicket >= 2) {
                className = 'shadow bg-emerald-50 text-emerald-700'
            } else if (inning.wicket === 0) {
                className = 'bg-gray-200 shadow text-emerald-700'
            }
        }
    }

    return className
}

export default SavedPlayerStats