import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { HiExternalLink } from 'react-icons/hi'

interface VenueStatsCardProps {
    venueData: any[]
    className?: string
}

const VenueStatsCard: React.FC<VenueStatsCardProps> = ({ venueData, className }) => {
    return (
        <>
            {venueData.length > 0 && <Card className={className}>
                <CardHeader>
                    <CardTitle className="capitalize inline">
                        In <Link target="_blank" className="text-blue-700 hover:underline" href={`./venue/${venueData[0].venueId}`}>
                            <span>{venueData[0].venueId}</span> <HiExternalLink className='inline mb-[3px]' />
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-2 items-center">
                        Scores
                        <div>
                            {venueData.map((item: any, index: number) => {
                                let score: number = 0
                                item.Scores.map((_score: any) => {
                                    if (score < _score.runs) {
                                        score = _score.runs
                                    }
                                })

                                const date = new Date(item.matchDate)
                                const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

                                return <div className="inline-block" key={index}>
                                    <Popover>
                                        <PopoverTrigger className="inline-block lg:hidden">
                                            <span className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border`}>{score}</span>
                                        </PopoverTrigger>
                                        <PopoverContent className="inline-block lg:hidden">
                                            <div className="space-y-2">
                                                <div className="text-center">
                                                    {item.Scores[0].teamId} vs {item.Scores[1].teamId}
                                                </div>
                                                <Separator />
                                                <div className="flex h-10 items-center space-x-4 text-sm pb-1">
                                                    <div className="text-center">
                                                        <div className="mb-1">{item.Scores[0].teamId}</div>
                                                        <span className={`rounded-sm px-1 mx-1 inline-block text-center shadow text-sm border`}>{item.Scores[0].runs}/{item.Scores[1].wickets}</span>
                                                    </div>
                                                    <Separator orientation="vertical" />
                                                    <div className="text-center">
                                                        <div className="mb-1">{item.Scores[1].teamId}</div>
                                                        <span className={`rounded-sm px-1 mx-1 inline-block text-center shadow text-sm border`}>{item.Scores[1].runs}/{item.Scores[0].wickets}</span>
                                                    </div>
                                                </div>
                                                <Separator />
                                                <div className="text-center">
                                                    <span className="text-sm text-muted-foreground">{date.toLocaleString('en-IN', options)}</span>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    <HoverCard openDelay={300}>
                                        <HoverCardTrigger className="hidden lg:inline-block">
                                            <span className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border`}>{score}</span>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="hidden lg:inline-block">
                                            <div className="space-y-2">
                                                <div className="text-center">
                                                    {item.Scores[0].teamId} vs {item.Scores[1].teamId}
                                                </div>
                                                <Separator />
                                                <div className="flex h-10 items-center space-x-4 text-sm pb-1">
                                                    <div className="text-center">
                                                        <div className="mb-1">{item.Scores[0].teamId}</div>
                                                        <span className={`rounded-sm px-1 mx-1 inline-block text-center shadow text-sm border`}>{item.Scores[0].runs}/{item.Scores[1].wickets}</span>
                                                    </div>
                                                    <Separator orientation="vertical" />
                                                    <div className="text-center">
                                                        <div className="mb-1">{item.Scores[1].teamId}</div>
                                                        <span className={`rounded-sm px-1 mx-1 inline-block text-center shadow text-sm border`}>{item.Scores[1].runs}/{item.Scores[0].wickets}</span>
                                                    </div>
                                                </div>
                                                <Separator />
                                                <div className="text-center">
                                                    <span className="text-sm text-muted-foreground">{date.toLocaleString('en-IN', options)}</span>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                        Bat First

                        <div>
                            {venueData.map((match: any, index: number) => {
                                let style: string = ``
                                let result: string = ''
                                if (match.batFirst === match.result) {
                                    result = 'w'
                                    style = 'bg-emerald-600 text-white'
                                } else {
                                    result = 'l'
                                    style = 'bg-red-600 text-white'
                                }

                                return <span key={index} className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm capitalize ${style}`}>{result}</span>
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default VenueStatsCard

function scoresView(teamStats: any) {
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