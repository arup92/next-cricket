import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface MatchDataProps {
    data: Matches
}

const MatchData: React.FC<MatchDataProps> = ({ data }) => {
    const router = useRouter()
    const dateOptions: any = { year: 'numeric', month: 'long', day: 'numeric' }

    return (
        <Card className="mb-6">
            <CardContent className="py-3">
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-sm">{data.teamAId} vs {data.teamBId}</p>
                        <p className="text-sm text-muted-foreground capitalize">{data.venueId} ({new Date(data.matchDate).toLocaleString('en-IN', dateOptions)})</p>
                    </div>

                    <div>
                        <p className="font-semibold text-sm">Bat First</p>
                        <p className="text-sm text-muted-foreground capitalize">{data.batFirst}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-sm">Result</p>
                        <p className="text-sm text-muted-foreground capitalize">{data.result}</p>
                    </div>

                    <div>
                        <Button variant={"default"} onClick={() => { router.back() }}>Back</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default MatchData
