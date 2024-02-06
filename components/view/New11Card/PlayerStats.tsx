import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import useSelectCardStore from "@/store/selectCard"
import useZStore from "@/store/store"
import { fantasyPointColor } from "@/utils/style"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useEffect } from "react"
import { BiSolidCricketBall, BiSolidHide, BiSolidShow } from "react-icons/bi"
import { GiCricketBat } from "react-icons/gi"
import { MdSportsCricket } from "react-icons/md"
import PlayerPopUpBat from "./Card/PlayerPopUpBat"
import PlayerPopUpBowl from "./Card/PlayerPopUpBowl"

interface PlayerStatsProps {
    playerData: any
    className?: string
    teamId: string
    oppCountryId: string
    matchFormat: string
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ playerData, className, teamId, oppCountryId, matchFormat }) => {
    const deSelected = useZStore()
    const pickPlayer = useSelectCardStore()
    const pathname = usePathname()

    useEffect(() => {
        if (pathname.split('create-new-11/')[1] !== deSelected.currentPage) {
            deSelected.emptyCardDeSelected()
        }
        deSelected.addCurrentPage(pathname.split('create-new-11/')[1])
    }, [pathname])

    const playerDataKeys = Object.keys(playerData) // Array of player names
    let venueName: string = ''

    // Set: Show Hide Card
    const handleDeSelected = (index: number) => {
        if (deSelected.cardDeSelected[index]) {
            deSelected.removeCardDeSelected({ index })
            return
        }

        deSelected.addCardDeSelected({ [index]: true })
    }

    // Set: Select Player
    const handlePicked = (playerId: string) => {
        if (pickPlayer.playerIds[playerId]) {
            pickPlayer.remove(playerId)
            return
        }

        pickPlayer.add(playerId)
    }

    return (
        <>
            {playerDataKeys.length > 0 && playerDataKeys.map((player: any, index: number) => {
                let totalFantasyPoints: number = 0
                let totalFantasyPointsVsTeam: number = 0
                let totalFantasyPointsInVenue: number = 0
                matchFormat = matchFormat.toUpperCase()

                if (playerData[player].teamId === teamId)
                    return <Card className={`relative ${className}`} key={index}>
                        <div
                            onClick={() => handlePicked(player)}
                            className="absolute top-0 left-0 text-white text-xs bg-gray-800 rounded-tr-sm rounded-bl-sm cursor-pointer px-1 z-20"
                        >
                            {deSelected.cardDeSelected[index] ? <BiSolidShow /> : <BiSolidHide />}
                        </div>

                        <div
                            onClick={() => handleDeSelected(index)}
                            className="absolute top-0 right-0 text-white text-xs bg-gray-800 rounded-tr-sm rounded-bl-sm cursor-pointer px-1 z-20"
                        >
                            {deSelected.cardDeSelected[index] ? <BiSolidShow /> : <BiSolidHide />}
                        </div>
                        <div className={`${deSelected.cardDeSelected[index] ? 'absolute top-0 left-0 w-full h-full bg-white  backdrop-blur bg-opacity-70 rounded-sm z-10' : ''}`}>
                        </div>
                        <CardHeader>
                            <CardTitle className="capitalize">
                                <div className="flex justify-between">
                                    <p className="flex items-center">
                                        <Link
                                            className="text-blue-700 hover:underline"
                                            href={`${process.env.NEXT_PUBLIC_APP_URL}/view/player/${player}/${matchFormat}`}
                                        >
                                            {player.replaceAll('_', ' ')}
                                        </Link>
                                        <span className="ml-1 rounded-full border p-1 shadow-sm">
                                            {playerData[player].playerType === 'AllRounder' && <MdSportsCricket />}
                                            {playerData[player].playerType === 'Batsman' && <GiCricketBat />}
                                            {playerData[player].playerType === 'Bowler' && <BiSolidCricketBall />}
                                        </span>
                                    </p>
                                    <p>{teamId}</p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {playerData[player].bat && <div className="border border-gray-400 px-2 py-1 rounded-sm mb-3">
                                <div className="flex justify-between items-center">
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
                                    <div className="flex justify-between items-center pt-1">
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
                                    <div className="flex justify-between items-center pt-1">
                                        <p>In {venueName = playerData[player].batInVenue[0].venueName}</p>
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

                            {playerData[player].teamId === teamId && playerData[player].bowl && <div className="border border-gray-300 px-2 py-1 rounded-sm mb-3">
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
                                        <p>In {venueName = playerData[player].bowlInVenue[0].venueName}</p>
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

                            {totalFantasyPoints && <div className="border border-gray-400 px-2 py-1 rounded-sm">
                                <div className="flex justify-between items-center">
                                    <p>Fantasy Points</p>
                                    <div className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${fantasyPointColor(totalFantasyPoints, matchFormat)}`}>
                                        {totalFantasyPoints}
                                    </div>
                                </div>

                                {totalFantasyPointsVsTeam > 0 && <>
                                    <Separator className="mt-1" />
                                    <div className="flex justify-between items-center pt-1">
                                        <p>Vs {oppCountryId}</p>
                                        <div className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${fantasyPointColor(totalFantasyPointsVsTeam, matchFormat)}`}>
                                            {totalFantasyPointsVsTeam}
                                        </div>
                                    </div>
                                </>}

                                {totalFantasyPointsInVenue > 0 && <>
                                    <Separator className="mt-1" />
                                    <div className="flex justify-between items-center pt-1">
                                        <p>In {venueName}</p>
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
                className = 'bg-emerald-700 text-white shadow'
            } else if (inning.run >= 75) {
                className = 'bg-emerald-600 text-white shadow'
            } else if (inning.run >= 50) {
                className = 'bg-emerald-500 text-white shadow'
            } else if (inning.run >= 40) {
                className = 'bg-emerald-50 text-emerald-700 shadow'
            } else if (inning.run <= 9) {
                className = 'bg-gray-200 text-emerald-700 shadow'
            }
        } else if (type === 'bowling') {
            if (inning.wicket >= 5) {
                className = 'bg-emerald-700 text-white shadow'
            } else if (inning.wicket >= 3) {
                className = 'bg-emerald-600 text-white shadow'
            } else if (inning.wicket >= 2) {
                className = 'bg-emerald-50 text-emerald-700 shadow'
            } else if (inning.wicket === 0) {
                className = 'bg-gray-200 text-emerald-700 shadow'
            }
        }
    } else if (matchFormat === 'T20' || matchFormat === 'IPL') {
        if (type === 'batting') {
            if (inning.run >= 100) {
                className = 'bg-emerald-700 text-white shadow'
            } else if (inning.run >= 75) {
                className = 'bg-emerald-600 text-white shadow'
            } else if (inning.run >= 50) {
                className = 'bg-emerald-500 text-white shadow'
            } else if (inning.run >= 30) {
                className = 'bg-emerald-50 text-emerald-700 shadow'
            } else if (inning.run <= 9) {
                className = 'bg-gray-200 text-emerald-700 shadow'
            }
        } else if (type === 'bowling') {
            if (inning.wicket >= 5) {
                className = 'bg-emerald-700 text-white shadow'
            } else if (inning.wicket >= 3) {
                className = 'bg-emerald-600 text-white shadow'
            } else if (inning.wicket >= 2) {
                className = 'bg-emerald-50 text-emerald-700 shadow'
            } else if (inning.wicket === 0) {
                className = 'bg-gray-200 text-emerald-700 shadow'
            }
        }
    }

    return className
}

export default PlayerStats