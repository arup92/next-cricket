import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Head2HeadProps {
    h2h: any[]
    className?: string
}

const Head2HeadCard: React.FC<Head2HeadProps> = ({ h2h, className }) => {
    console.log(h2h);

    return (
        <>
            {h2h.length > 0 && <Card className={className}>
                <CardHeader>
                    <CardTitle className="text-center">Head to Head</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-1 items-center">
                        <p>{h2h[0].teamAId}</p>
                        <div>
                            {h2h.map((team: any, index) => {
                                let teamlass = ``
                                if (team.result !== team.venue.venueCountryId) {
                                    teamlass = 'bg-emerald-600 text-white border-transparent'
                                }

                                const date = new Date(team.matchDate)
                                const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

                                return <div className="inline-block" key={index}>
                                    <Popover>
                                        <PopoverTrigger className="inline-block lg:hidden"><span className={`rounded-sm px-1 mr-1 inline-block text-center shadow text-sm border ${teamlass}`}>{team.result}</span></PopoverTrigger>
                                        <PopoverContent className="inline-block lg:hidden">
                                            In <span className="capitalize">{team.venueId}, {team.venue.venueCountryId} </span>
                                            <span className="text-sm text-muted-foreground">({date.toLocaleString('en-IN', options)})</span>
                                        </PopoverContent>
                                    </Popover>

                                    <HoverCard>
                                        <HoverCardTrigger className="hidden lg:inline-block"><span className={`rounded-sm px-1 mr-1  inline-block text-center shadow text-sm border ${teamlass}`}>{team.result}</span></HoverCardTrigger>
                                        <HoverCardContent className="hidden lg:inline-block">
                                            In <span className="capitalize">{team.venueId}, {team.venue.venueCountryId} </span>
                                            <span className="text-sm text-muted-foreground">({date.toLocaleString('en-IN', options)})</span>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            })}
                        </div>
                        <p>{h2h[0].teamBId}</p>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default Head2HeadCard