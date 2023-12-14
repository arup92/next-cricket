import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BowlingTableProps {
    bowlData: any[]
}

const BowlingTable: React.FC<BowlingTableProps> = ({ bowlData }) => {

    // Total for Average
    let totalWickets = 0
    let totalEcos = 0
    let totalMaidens = 0
    bowlData.forEach((item: any) => {
        totalWickets += item.wicket
        totalEcos += item.eco
        totalMaidens += item.maiden
    })

    return (
        <>
            {bowlData.length > 0 &&
                <Card className="mb-3">
                    <CardContent className="py-3">
                        <div className="text-center mb-3">
                            <h2 className="text-center font-bold text-xl inline mr-1">Bowling</h2>
                            <p className="inline text-muted-foreground text-sm">(Recent 10 Records)</p>
                        </div>

                        <div className="flex items-center justify-between mb-3 text-muted-foreground">
                            <p>
                                Avg W: <span className="text-green-700 font-bold px-1 border rounded-sm">
                                    {Math.round(totalWickets / bowlData.length)}
                                </span>
                            </p>
                            <p>
                                E: <span className="text-green-700 font-bold px-1 border rounded-sm">
                                    {Math.round(totalEcos / bowlData.length)}
                                </span>
                            </p>
                            <p>
                                M: <span className="text-green-700 font-bold px-1 border rounded-sm">
                                    {Math.round(totalMaidens / bowlData.length)}
                                </span>
                            </p>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Wicket</TableHead>
                                    <TableHead>Maiden</TableHead>
                                    <TableHead>Economy</TableHead>
                                    <TableHead>Innings</TableHead>
                                    <TableHead>Opponent</TableHead>
                                    <TableHead className="hidden lg:table-cell">Result</TableHead>
                                    <TableHead className="hidden lg:table-cell">Venue</TableHead>
                                    <TableHead className="hidden lg:table-cell">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bowlData.map((item: any, index: number) => {
                                    const date = new Date(item.matchDate)
                                    const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

                                    let bowlingClassName = ``
                                    if (item.wicket >= 5) {
                                        bowlingClassName = 'bg-emerald-700 text-white shadow'
                                    } else if (item.wicket >= 3) {
                                        bowlingClassName = 'bg-emerald-600 text-white shadow'
                                    } else if (item.wicket >= 2) {
                                        bowlingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                                    }

                                    // Results
                                    let result = 'Win'
                                    let resultColor = 'bg-emerald-700 text-white shadow'
                                    if (item.teamId !== item.Match.result) {
                                        result = 'Lose'
                                        resultColor = 'bg-red-500 text-white shadow'
                                    }

                                    // Innings
                                    let innings = '1st'
                                    let inningsColor = 'bg-gray-300 shadow'
                                    if (item.teamId !== item.Match.batFirst) {
                                        innings = '2nd'
                                        inningsColor = 'bg-white shadow'
                                    }

                                    return <TableRow key={index}>
                                        <TableCell><span className={`p-1 block w-10 h-5 leading-[1] text-center rounded ${bowlingClassName}`}>{item.wicket}</span></TableCell>
                                        <TableCell>{item.maiden}</TableCell>
                                        <TableCell>{item.eco.toFixed(1)}</TableCell>
                                        <TableCell>
                                            <span className={`px-1.5 py-0.5 rounded-sm w-[36px] text-center inline-block ${inningsColor}`}>
                                                {innings}
                                            </span>
                                        </TableCell>
                                        <TableCell>{item.oppCountryId}</TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <span className={`px-1.5 py-0.5 rounded-sm text-xs ${resultColor}`}>{result}</span>
                                        </TableCell>
                                        <TableCell className="capitalize hidden lg:table-cell text-sm">
                                            {item.venueId.replaceAll('_', ' ')}, {item.venue.venueCountryId}
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">{date.toLocaleString('en-IN', options)}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>}
        </>
    )
}

export default BowlingTable
