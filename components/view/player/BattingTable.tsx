import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDateString } from "@/utils/utils";
import Link from "next/link";

interface BattingTableProps {
    batData: any[]
}

const BattingTable: React.FC<BattingTableProps> = ({ batData }) => {
    // Total for Average
    let totalRuns = 0
    let totalSixes = 0
    let totalFours = 0
    let totalSRs = 0
    let totalf11p = 0
    batData.forEach((item: any) => {
        totalRuns += item.run
        totalSixes += item.six
        totalFours += item.four
        totalSRs += item.strikeRate
        totalf11p += item.f11points
    })

    return (
        <>
            {batData.length > 0 &&
                <Card className="mb-3">
                    <CardContent className="py-3">
                        <div className="text-center mb-3">
                            <h2 className="text-center font-bold text-xl inline mr-1">Batting</h2>
                            <p className="inline text-muted-foreground text-sm">(Recent 10 Records)</p>
                        </div>
                        <div className="flex items-center justify-between mb-3 text-muted-foreground">
                            <p>
                                Avg Run: <span className="text-green-700 font-bold px-1 border rounded-sm">
                                    {Math.round(totalRuns / batData.length)}
                                </span>
                            </p>
                            <p>
                                F11Points: <span className="text-green-700 font-bold px-1 border rounded-sm">
                                    {Math.round(totalf11p / batData.length)}
                                </span>
                            </p>
                            <p>
                                6: <span className="text-green-700 font-bold px-1 border rounded-sm">
                                    {Math.round(totalSixes / batData.length)}
                                </span>
                            </p>
                            <p>
                                4: <span className="text-green-700 font-bold px-1 border rounded-sm">
                                    {Math.round(totalFours / batData.length)}
                                </span>
                            </p>
                            <p>
                                SR: <span className="text-green-700 font-bold px-1 border rounded-sm">
                                    {Math.round(totalSRs / batData.length)}
                                </span>
                            </p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">R</TableHead>
                                    <TableHead>Pts</TableHead>
                                    <TableHead>6s</TableHead>
                                    <TableHead>4s</TableHead>
                                    <TableHead className="hidden lg:table-cell">SR</TableHead>
                                    <TableHead>Inn</TableHead>
                                    <TableHead>Vs</TableHead>
                                    <TableHead className="hidden lg:table-cell">Result</TableHead>
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
                                        <TableCell><span className={`p-1 my-0 mx-auto block w-10 h-5 leading-[1] text-center rounded ${battingClassName}`}>{item.run}</span></TableCell>
                                        <TableCell>{item.f11points}</TableCell>
                                        <TableCell>{item.six}</TableCell>
                                        <TableCell>{item.four}</TableCell>
                                        <TableCell className={`hidden lg:table-cell`}>{Math.round(item.strikeRate)}</TableCell>
                                        <TableCell>
                                            <span className={`px-1.5 py-0.5 rounded-sm w-[36px] text-center inline-block ${inningsColor}`}>
                                                {innings}
                                            </span>
                                        </TableCell>
                                        <TableCell>{item.oppCountryId}</TableCell>
                                        <TableCell className={`hidden lg:table-cell`}>
                                            <span className={`px-1.5 py-0.5 rounded-sm text-xs ${resultColor}`}>
                                                {result}
                                            </span>
                                        </TableCell>
                                        <TableCell className={`capitalize hidden lg:table-cell text-sm`}>
                                            <Link className="text-blue-700 hover:underline" href={`/view/venue/${item.venueId.replaceAll('_', ' ')}`}>{item.venueId.replaceAll('_', ' ')}</Link>, {item.venue.venueCountryId}
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">{formatDateString(date.toString())}</TableCell>
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
