import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BattingTableProps {
    batData: any[]
}

const BattingTable: React.FC<BattingTableProps> = ({ batData }) => {
    return (
        <>
            {batData.length > 0 &&
                <Card className="mb-3">
                    <CardContent className="py-3">
                        <div className="text-center mb-3">
                            <h2 className="text-center font-bold text-xl inline mr-1">Batting</h2>
                            <p className="inline text-muted-foreground text-sm">(Last 10 Records)</p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Run</TableHead>
                                    <TableHead>Six</TableHead>
                                    <TableHead>Four</TableHead>
                                    <TableHead>Strike Rate</TableHead>
                                    <TableHead>Opponent</TableHead>
                                    <TableHead className="hidden lg:table-cell">Venue</TableHead>
                                    <TableHead className="hidden lg:table-cell">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {batData.map((item: any, index: number) => {
                                    const date = new Date(item.matchDate)
                                    const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

                                    let battingClassName = ``
                                    if (item.run >= 100) {
                                        battingClassName = 'bg-emerald-700 text-white shadow'
                                    } else if (item.run >= 75) {
                                        battingClassName = 'bg-emerald-600 text-white shadow'
                                    } else if (item.run >= 50) {
                                        battingClassName = 'bg-emerald-500 text-white shadow'
                                    } else if (item.run >= 40) {
                                        battingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                                    }
                                    return <TableRow key={index}>
                                        <TableCell><span className={`p-1 block w-10 h-5 leading-[1] text-center rounded ${battingClassName}`}>{item.run}</span></TableCell>
                                        <TableCell>{item.six}</TableCell>
                                        <TableCell>{item.four}</TableCell>
                                        <TableCell>{item.strikeRate}</TableCell>
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

export default BattingTable
