import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MatchResultsProps {
    teamA: any
    teamB: any
    className?: string
}

const MatchResults: React.FC<MatchResultsProps> = ({ teamA, teamB, className }) => {

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

        return <div className="inline-block" key={index}>
            <Popover>
                <PopoverTrigger className="inline-block lg:hidden">
                    <span className={`rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
                </PopoverTrigger>
                <PopoverContent className="inline-block lg:hidden">
                    <div className="flex items-center">
                        <span className={`rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
                        <span> vs {vs} <span className="text-sm text-muted-foreground">({date.toLocaleString('en-IN', options)})</span></span>
                    </div>
                </PopoverContent>
            </Popover>

            <HoverCard openDelay={300}>
                <HoverCardTrigger className="hidden lg:inline-block">
                    <span className={`rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
                </HoverCardTrigger>
                <HoverCardContent className="hidden lg:inline-block">
                    <div className="flex items-center">
                        <span className={`rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
                        <span> vs {vs} <span className="text-sm text-muted-foreground">({date.toLocaleString('en-IN', options)})</span></span>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    })
}