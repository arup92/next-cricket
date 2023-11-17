import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface MatchResultsProps {
    teamA: any
    teamB: any
    className?: string
}

const MatchResults: React.FC<MatchResultsProps> = ({ teamA, teamB, className }) => {

    console.log(teamA);


    const teamAStat = Object.keys(teamA).length !== 0 && teamA.teamStat.length > 0 && getWLResults(teamA.teamStat, teamA.team)
    const teamBStat = Object.keys(teamA).length !== 0 && teamB.teamStat.length > 0 && getWLResults(teamB.teamStat, teamB.team)

    return (
        <>
            {teamAStat && <Card className={className}>
                <CardHeader>
                    <CardTitle>Recent Performances</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-1 items-center">
                        {teamA.team}
                        <div>
                            {teamAStat}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        {teamB.team}
                        <div>
                            {teamBStat}
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default MatchResults

function getWLResults(stats: any[], teamId: string) {
    return stats.map((item: any, index: number) => {
        let style: string = ``
        let result: string = ''
        let vs: string = ''

        const date = new Date(item.matchDate)
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

        if (item.result === teamId) {
            vs = (item.result === item.teamAId) ? item.teamBId : item.teamAId
            result = 'w'
            style = 'bg-emerald-600 text-white'
        } else {
            vs = (item.result === item.teamAId) ? item.teamAId : item.teamBId
            result = 'l'
            style = 'bg-red-600 text-white'
        }

        return <HoverCard openDelay={300} key={index}>
            <HoverCardTrigger>
                <span className={`rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex items-center">
                    <span className={`rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
                    <span> vs {vs} <span className="text-sm text-muted-foreground">({date.toLocaleString('en-IN', options)})</span></span>
                </div>
            </HoverCardContent>
        </HoverCard>
    })
}