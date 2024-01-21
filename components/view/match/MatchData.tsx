import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface MatchDataProps {
    data: Matches
    scores: any[]
}

const MatchData: React.FC<MatchDataProps> = ({ data, scores }) => {
    const date = new Date(data.matchDate)
    const dateOptions: any = { year: 'numeric', month: 'long', day: 'numeric' }

    return (
        <Card className="mb-6">
            <CardContent className="py-1 flex justify-between">
                <p className="text-muted-foreground text-sm">
                    {data.matchFormat}, {date.toLocaleString('en-IN', dateOptions)}
                </p>

                <p className="text-muted-foreground text-sm capitalize">
                    <Link className="text-blue-700 hover:underline" href={`/view/venue/${data.venueId}`}>{data.venueId}</Link>, {data.venue.venueCountryId}
                </p>
            </CardContent>
            <Separator />
            <CardContent className="py-3 space-y-3">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">
                        <Link
                            className="text-blue-700 hover:underline"
                            href={`/view/team/${scores[0].Team.teamId.toLowerCase()}`}
                        >
                            {scores[0].Team.teamName}
                        </Link>
                    </h2>
                    <p className="text-xl font-bold">{scores[0].runs}/{scores[1].wickets}</p>
                </div>

                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">
                        <Link
                            className="text-blue-700 hover:underline"
                            href={`/view/team/${scores[1].Team.teamId.toLowerCase()}`}
                        >
                            {scores[1].Team.teamName}
                        </Link>
                    </h2>
                    <p className="text-xl font-bold">{scores[1].runs}/{scores[0].wickets}</p>
                </div>
            </CardContent>
            <Separator />
            <CardContent className="py-1 flex justify-between">
                <p className="text-muted-foreground text-sm">Match Result: <span className="text-emerald-700">
                    {!!data.resultTeamName ? data.resultTeamName : 'Tie'}
                </span></p>
                <p className="text-muted-foreground text-sm">Bat First: <span className="text-emerald-700">{data.batFirstTeamName}</span></p>
            </CardContent>
        </Card>
    )
}

export default MatchData
