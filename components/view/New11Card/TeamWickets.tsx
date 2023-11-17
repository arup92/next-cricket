import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
                    {wicketsView(teamA)}
                    {wicketsView(teamB)}
                </CardContent>
            </Card>}
        </>
    )
}

export default TeamWickets

function wicketsView(teamStats: any) {
    return <div className="flex justify-between mb-2 items-center">
        {teamStats.team}
        <div>
            {teamStats.scores.map((score: any, index: number) => {
                let scoreClass = ``
                if (score.wickets >= 8) {
                    scoreClass = 'bg-emerald-600 text-white border-transparent'
                } else if (score.wickets <= 4) {
                    scoreClass = 'bg-red-600 text-white border-transparent'
                }

                const date = new Date(score.Match.matchDate)
                const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

                return <div className="inline-block" key={index}>
                    <Popover>
                        <PopoverTrigger className="inline-block lg:hidden">
                            <span className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border ${scoreClass}`}>{score.runs}</span>
                        </PopoverTrigger>
                        <PopoverContent className="inline-block lg:hidden">
                            <div className="flex items-center">
                                <span className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border ${scoreClass}`}>{score.runs}</span>
                                <span> vs {score.oppCountryId}</span> <span className="text-sm text-muted-foreground">({date.toLocaleString('en-IN', options)})</span>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <HoverCard openDelay={300}>
                        <HoverCardTrigger className="hidden lg:inline-block">
                            <span className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border ${scoreClass}`}>{score.wickets}</span>
                        </HoverCardTrigger>
                        <HoverCardContent className="hidden lg:inline-block">
                            <div className="flex items-center">
                                <span className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border ${scoreClass}`}>{score.wickets}</span>
                                <span> vs {score.oppCountryId}</span> <span className="text-sm text-muted-foreground">({date.toLocaleString('en-IN', options)})</span>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            })}
        </div>
    </div>
}