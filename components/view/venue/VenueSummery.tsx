import { Card, CardContent } from "@/components/ui/card";

interface VenueSummeryProps {
    matchData: any
}

const VenueSummery: React.FC<VenueSummeryProps> = ({ matchData }) => {
    let total1stInnScore: number = 0
    let total2ndInnScore: number = 0
    let total1stInnWickets: number = 0
    let total2ndInnWickets: number = 0
    matchData.forEach((match: any) => {
        match.Scores.forEach((score: any) => {
            if (score.teamId === match.batFirst) {
                total1stInnScore += score.runs
                total2ndInnWickets += score.wickets
            } else {
                total2ndInnScore += score.runs
                total1stInnWickets += score.wickets
            }
        })
    })

    return (
        <Card className="mb-4">
            <CardContent className="p-3 lg:flex items-center justify-between">
                <div className="w-1/2 inline-block text-sm lg:text-base">
                    <p>Avg 1st inns run: {Math.round(total1stInnScore / matchData.length)}</p>
                </div>

                <div className="w-1/2 inline-block text-sm lg:text-base text-right lg:text-left">
                    <p>Avg 2nd inns run: {Math.round(total2ndInnScore / matchData.length)}</p>
                </div>

                <div className="w-1/2 inline-block text-sm lg:text-base">
                    <p>Avg 1st inns wicket: {Math.round(total1stInnWickets / matchData.length)}</p>
                </div>

                <div className="w-1/2 inline-block  text-sm lg:text-base text-right lg:text-left">
                    <p>Avg 2nd inns wicket: {Math.round(total2ndInnWickets / matchData.length)}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default VenueSummery
