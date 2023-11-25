import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface PlayerPopUpBatProps {
    themeclass: string
    inning: any
}

const PlayerPopUpBat: React.FC<PlayerPopUpBatProps> = ({ themeclass, inning }) => {
    // console.log(inning);

    return (
        <div className="inline-block">
            <Popover>
                <PopoverTrigger className="inline-block lg:hidden">
                    <span className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${themeclass}`}>{inning.run}</span>
                </PopoverTrigger>
                <PopoverContent className="inline-block lg:hidden">
                    <div className="space-y-2">
                        <p>
                            <span className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${themeclass}`}>{inning.run}</span> <span> vs {inning.oppCountryId} <span className="text-sm text-muted-foreground">({inning.matchDate})</span></span>
                        </p>
                        <Separator />
                        <div className="flex h-10 items-center space-x-4 text-sm">
                            <div>
                                Fours
                                <div className="text-center">
                                    {inning.four}
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <span>Sixes</span>
                                <div className="text-center">
                                    {inning.six}
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                Strike Rate
                                <div className="text-center">
                                    {inning.strikeRate}
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            In {inning.venueName} ({inning.venueCountry})
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            <HoverCard openDelay={300}>
                <HoverCardTrigger className="hidden lg:inline-block">
                    <span className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${themeclass}`}>{inning.run}</span>
                </HoverCardTrigger>
                <HoverCardContent className="hidden lg:inline-block">
                    <div className="space-y-2">
                        <p>
                            <span className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${themeclass}`}>{inning.run}</span> <span> vs {inning.oppCountryId} <span className="text-sm text-muted-foreground">({inning.matchDate})</span></span>
                        </p>
                        <Separator />
                        <div className="flex h-10 items-center space-x-4 text-sm">
                            <div>
                                Fours
                                <div className="text-center">
                                    {inning.four}
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <span>Sixes</span>
                                <div className="text-center">
                                    {inning.six}
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                Strike Rate
                                <div className="text-center">
                                    {inning.strikeRate}
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            In {inning.venueName} ({inning.venueCountry})
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

export default PlayerPopUpBat
