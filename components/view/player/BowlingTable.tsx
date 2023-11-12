import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

interface BowlingTableProps {
    bowlData: any[]
}

const BowlingTable: React.FC<BowlingTableProps> = ({ bowlData }) => {
    return (
        <>
            {bowlData.length > 0 &&
                <Card className="mb-3">
                    <CardContent className="py-3">
                        <div className="text-center mb-3">
                            <h2 className="text-center font-bold text-xl inline mr-1">Bowling</h2>
                            <p className="inline text-muted-foreground text-sm">(Last 10 Records)</p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Wicket</TableHead>
                                    <TableHead>Maiden</TableHead>
                                    <TableHead>Economy</TableHead>
                                    <TableHead>Opponent</TableHead>
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

                                    return <TableRow key={index}>
                                        <TableCell><span className={`p-1 block w-10 h-5 leading-[1] text-center rounded ${bowlingClassName}`}>{item.wicket}</span></TableCell>
                                        <TableCell>{item.maiden}</TableCell>
                                        <TableCell>{item.eco}</TableCell>
                                        <TableCell>{item.oppCountryId}</TableCell>
                                        <TableCell className="capitalize hidden lg:table-cell">{item.venueId.replaceAll('_', ' ')}</TableCell>
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
