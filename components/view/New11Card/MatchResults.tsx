import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MatchResultsProps {
    teamA: any
    teamB: any
    className?: string
}

const MatchResults: React.FC<MatchResultsProps> = ({ teamA, teamB, className }) => {

    const teamAStats = teamA?.stats && getWLResults(teamA.stats)
    const teamBStats = teamB?.stats && getWLResults(teamB.stats)

    return (
        <>
            {teamAStats && <Card className={className}>
                <CardHeader>
                    <CardTitle>Recent Performances</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-1 items-center">
                        {teamA.team}
                        <div>
                            {teamAStats}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        {teamB.team}
                        <div>
                            {teamBStats}
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default MatchResults

function getWLResults(stats: any[]) {
    return stats.map((result: string, index: number) => {
        let style = ``
        if (result === 'w') {
            style = 'bg-emerald-600 text-white'
        } else if (result === 'l') {
            style = 'bg-red-600 text-white'
        }

        return <span key={index} className={`rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
    })
}