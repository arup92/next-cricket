import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fantasyPointsCount, getPlayerStats } from "@/utils/utils"
import PlayerPopUpBat from "./Card/PlayerPopUpBat"
import PlayerPopUpBowl from "./Card/PlayerPopUpBowl"
import { useState } from "react"

interface PlayerStatsProps {
    playerData: any
    className?: string
    teamId: string
    oppCountryId: string
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ playerData, className, teamId, oppCountryId }) => {
    const playerDataKeys = Object.keys(playerData) // Array of player names

    return (
        <>
            {playerDataKeys.length > 0 && playerDataKeys.map((player: any, index: number) => {
                let totalFantasyPoints: number = 0
                let totalFantasyPointsVsTeam: number = 0
                if (playerData[player].teamId === teamId)
                    return <Card className={className} key={index}>
                        <CardHeader>
                            <CardTitle className="capitalize">
                                <div className="flex justify-between">
                                    <p>{player.replaceAll('_', ' ')}</p>
                                    <p>{teamId}</p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {playerData[player].bat && <div className="border border-gray-400 px-2 py-1 rounded-sm mb-3">
                                <div className="flex justify-between items-center mb-1">
                                    <p>Runs</p>
                                    <div>
                                        {playerData[player].bat && playerData[player].bat.map((inning: any, index: number) => {
                                            let battingClassName = ``
                                            if (inning.run >= 100) {
                                                battingClassName = 'bg-emerald-700 text-white shadow'
                                            } else if (inning.run >= 75) {
                                                battingClassName = 'bg-emerald-600 text-white shadow'
                                            } else if (inning.run >= 50) {
                                                battingClassName = 'bg-emerald-500 text-white shadow'
                                            } else if (inning.run >= 40) {
                                                battingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                                            } else if (inning.run <= 9) {
                                                battingClassName = 'bg-gray-200 text-emerald-700 shadow'
                                            }

                                            // Fantasy Point
                                            totalFantasyPoints += fantasyPointsCount(inning, 'bat')

                                            return <PlayerPopUpBat key={index} themeclass={battingClassName} inning={inning} />
                                        })}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-1">
                                    <p>Vs {oppCountryId}</p>
                                    <div>
                                        {playerData[player].batVsTeam && playerData[player].batVsTeam.map((inning: any, index: number) => {
                                            let battingClassName = ``
                                            if (inning.run >= 100) {
                                                battingClassName = 'bg-emerald-700 text-white shadow'
                                            } else if (inning.run >= 75) {
                                                battingClassName = 'bg-emerald-600 text-white shadow'
                                            } else if (inning.run >= 50) {
                                                battingClassName = 'bg-emerald-500 text-white shadow'
                                            } else if (inning.run >= 40) {
                                                battingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                                            } else if (inning.run <= 9) {
                                                battingClassName = 'bg-gray-200 text-emerald-700 shadow'
                                            }

                                            // Fantasy Point
                                            totalFantasyPointsVsTeam += fantasyPointsCount(inning, 'bat')

                                            return <PlayerPopUpBat key={index} themeclass={battingClassName} inning={inning} />
                                        })}
                                    </div>
                                </div>
                            </div>}

                            {playerData[player].teamId === teamId && playerData[player].bowl && <div className="border border-gray-300 px-2 py-1 rounded-sm mb-3">
                                <div className="flex justify-between">
                                    <p>Wickets</p>
                                    <div>
                                        {playerData[player].bowl && playerData[player].bowl.map((inning: any, index: number) => {
                                            let bowlingClassName = ``
                                            if (inning.wicket >= 5) {
                                                bowlingClassName = 'bg-emerald-700 text-white shadow'
                                            } else if (inning.wicket >= 3) {
                                                bowlingClassName = 'bg-emerald-600 text-white shadow'
                                            } else if (inning.wicket >= 2) {
                                                bowlingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                                            } else if (inning.wicket === 0) {
                                                bowlingClassName = 'bg-gray-200 text-emerald-700 shadow'
                                            }

                                            // Fantasy Point
                                            totalFantasyPoints += fantasyPointsCount(inning, 'bowl')

                                            return <PlayerPopUpBowl key={index} themeclass={bowlingClassName} inning={inning} />
                                        })}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <p>Vs {oppCountryId}</p>
                                    <div>
                                        {playerData[player].bowlVsTeam && playerData[player].bowlVsTeam.map((inning: any, index: number) => {
                                            let bowlingClassName = ``
                                            if (inning.wicket >= 5) {
                                                bowlingClassName = 'bg-emerald-700 text-white shadow'
                                            } else if (inning.wicket >= 3) {
                                                bowlingClassName = 'bg-emerald-600 text-white shadow'
                                            } else if (inning.wicket >= 2) {
                                                bowlingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                                            } else if (inning.wicket === 0) {
                                                bowlingClassName = 'bg-gray-200 text-emerald-700 shadow'
                                            }

                                            // Fantasy Point
                                            totalFantasyPointsVsTeam += fantasyPointsCount(inning, 'bowl')

                                            return <PlayerPopUpBowl key={index} themeclass={bowlingClassName} inning={inning} />
                                        })}
                                    </div>
                                </div>
                            </div>}

                            {totalFantasyPoints && <div className="border border-gray-400 px-2 py-1 rounded-sm mb-3">
                                <div className="flex justify-between items-center mb-1">
                                    <p>Fantasy Points</p>
                                    <div className="rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase">
                                        {totalFantasyPoints}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-1">
                                    <p>Vs {oppCountryId}</p>
                                    <div className="rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase">
                                        {totalFantasyPointsVsTeam}
                                    </div>
                                </div>
                            </div>}
                        </CardContent>
                    </Card>
            })}
        </>
    )
}

export default PlayerStats