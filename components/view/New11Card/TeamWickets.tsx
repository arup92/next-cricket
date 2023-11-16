import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TeamWicketsProps {
    teamA: any
    teamB: any
    className?: string
}

const TeamWickets: React.FC<TeamWicketsProps> = ({ teamA, teamB, className }) => {

    return (
        <>
            {!!teamA.scores && <Card className={className}>
                <CardHeader>
                    <CardTitle>Wickets Taken</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-2 items-center">
                        {teamA.team}
                        <div>
                            {teamA.scores.map((score: any, index: number) => {
                                let scoreClass = ``
                                if (score.wickets >= 8) {
                                    scoreClass = 'bg-emerald-600 text-white border-transparent'
                                } else if (score.wickets <= 4) {
                                    scoreClass = 'bg-red-600 text-white border-transparent'
                                }

                                return <span key={index} className={`rounded-sm px-1 w-[27px] mr-1 inline-block text-center shadow text-sm border ${scoreClass}`}>{score.wickets}</span>
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        {teamB.team}
                        <div>
                            {teamB.scores.map((score: any, index: number) => {
                                let scoreClass = ``
                                if (score.wickets >= 8) {
                                    scoreClass = 'bg-emerald-600 text-white border-transparent'
                                } else if (score.wickets <= 4) {
                                    scoreClass = 'bg-red-600 text-white border-transparent'
                                }

                                return <span key={index} className={`rounded-sm px-1 mr-1 w-[27px] inline-block text-center shadow text-sm border ${scoreClass}`}>{score.wickets}</span>
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default TeamWickets
