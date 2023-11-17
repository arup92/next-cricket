import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Head2HeadProps {
    h2h: any[]
    className?: string
}

const Head2Head: React.FC<Head2HeadProps> = ({ h2h, className }) => {

    return (
        <>
            {h2h.length > 0 && <Card className={className}>
                <CardHeader>
                    <CardTitle>Head to Head</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-1 items-center">
                        Result
                        <div>
                            {h2h.map((team: any, index) => {
                                let teamlass = ``
                                if (team.result !== team.venue.venueCountryId) {
                                    teamlass = 'bg-emerald-600 text-white border-transparent'
                                }

                                return <span key={index} className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border ${teamlass}`}>{team.result}</span>
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between mb-1 items-center">
                        Host
                        <div>
                            {h2h.map((team: any, index) => {
                                return <span key={index} className={`rounded-sm px-1 mr-1 w-[36px] inline-block text-center shadow text-sm border`}>{team.venue.venueCountryId}</span>
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default Head2Head

function getWLResults(stats: any[]) {
    return stats.map((result: string, index: number) => {
        let style = ``
        if (result === 'w') {
            style = 'bg-emerald-600 text-white'
        } else if (result === 'l') {
            style = 'bg-red-600 text-white'
        }

        return <span key={index} className={`rounded-sm w-[24px] inline-block text-center shadow px-1 mr-1 text-muted-foreground text-sm uppercase ${style}`}>{result}</span>
    })
}