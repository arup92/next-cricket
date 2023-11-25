import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface PlayerPopUpBowlProps {
    themeclass: string
    inning: any
}

const PlayerPopUpBowl: React.FC<PlayerPopUpBowlProps> = ({ themeclass, inning }) => {
    return (
        <div className="inline-block">
            <Popover>
                <PopoverTrigger className="inline-block lg:hidden">
                    <span className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${themeclass}`}>{inning.wicket}</span>
                </PopoverTrigger>
                <PopoverContent className="inline-block lg:hidden">
                    <div className="space-y-2">
                        <p>
                            <span className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${themeclass}`}>{inning.wicket}</span> <span> vs {inning.oppCountryId} <span className="text-sm text-muted-foreground">({inning.matchDate})</span></span>
                        </p>
                        <Separator />
                        <div className="flex h-10 items-center justify-center space-x-4 text-sm">
                            <div>
                                Maidens
                                <div className="text-center">
                                    {inning.maiden}
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <span>Economy</span>
                                <div className="text-center">
                                    {inning.eco}
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
                    <span className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${themeclass}`}>{inning.wicket}</span>
                </HoverCardTrigger>
                <HoverCardContent className="hidden lg:inline-block">
                    <div className="space-y-2">
                        <p>
                            <span className={`rounded-sm w-[34px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${themeclass}`}>{inning.wicket}</span> <span> vs {inning.oppCountryId} <span className="text-sm text-muted-foreground">({inning.matchDate})</span></span>
                        </p>
                        <Separator />
                        <div className="flex h-10 items-center justify-center space-x-4 text-sm">
                            <div>
                                Maidens
                                <div className="text-center">
                                    {inning.maiden}
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <span>Economy</span>
                                <div className="text-center">
                                    {inning.eco}
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

export default PlayerPopUpBowl
