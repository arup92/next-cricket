import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TeamScoresProps {
    teamA: any
    teamB: any
    className?: string
}

const TeamScores: React.FC<TeamScoresProps> = ({ teamA, teamB, className }) => {

    console.log(teamA.scores, teamA.wickets)

    return (
        <>
            {!!teamA.scores && <Card className={className}>
                <CardHeader>
                    <CardTitle>Team Scores</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-2 items-center">
                        {teamA.team}
                        <div>
                            {teamA.scores.map((score: any, index: number) => {
                                let scoreClass = ``
                                if (score._sum.run >= 300) {
                                    scoreClass = 'bg-emerald-600 text-white border-transparent'
                                } else if (score._sum.run <= 200) {
                                    scoreClass = 'bg-red-600 text-white border-transparent'
                                }

                                return <span key={index} className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border ${scoreClass}`}>{score._sum.run}</span>
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        {teamB.team}
                        <div>
                            {teamB.scores.map((score: any, index: number) => {
                                let scoreClass = ``
                                if (score._sum.run >= 300) {
                                    scoreClass = 'bg-emerald-600 text-white border-transparent'
                                } else if (score._sum.run <= 200) {
                                    scoreClass = 'bg-red-600 text-white border-transparent'
                                }

                                return <span key={index} className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border ${scoreClass}`}>{score._sum.run}</span>
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default TeamScores
