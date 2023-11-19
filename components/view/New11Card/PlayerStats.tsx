import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPlayerStats } from "@/utils/utils"

interface PlayerStatsProps {
    playerData: any
    className?: string
    teamId: string
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ playerData, className, teamId }) => {

    // console.log(getPlayerStats(playerData))

    const playerDataObjects = getPlayerStats(playerData)
    const playerDataKeys = Object.keys(playerDataObjects) // Array of player names

    return (
        <>
            {playerDataKeys.length > 0 && playerDataKeys.map((player: any, index: number) => {
                if (playerDataObjects[player].teamId === teamId)
                    return <Card className={className} key={index}>
                        <CardHeader>
                            <CardTitle className="capitalize">{player.replaceAll('_', ' ')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {playerDataObjects[player].bat && <div className="flex justify-between mb-1">
                                <p>Batting</p>
                                <div>
                                    {playerDataObjects[player].bat && playerDataObjects[player].bat.map((inning: any, index: number) => {
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

                                        return <span key={index} className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${battingClassName}`}>{inning.run}</span>
                                    })}
                                </div>
                            </div>}

                            {playerDataObjects[player].teamId === teamId && playerDataObjects[player].bowl && <div className="flex justify-between">
                                <p>Bowling</p>
                                <div>
                                    {playerDataObjects[player].bowl && playerDataObjects[player].bowl.map((inning: any, index: number) => {
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

                                        return <span key={index} className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${bowlingClassName}`}>{inning.wicket}</span>
                                    })}
                                </div>
                            </div>}
                        </CardContent>
                    </Card>
            })}
        </>
    )
}

export default PlayerStats