import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BattingDataType } from "@/types/BattingDataType"
import Link from "next/link"

interface BattingDataProps {
    data: BattingDataType[]
    score: number
    wickets: number
    teamName: string
    className?: string
}

const BattingData: React.FC<BattingDataProps> = ({ data: batters, score, teamName, wickets, className }) => {
    return (
        <Card className={`py-3 ${className}`}>
            <CardHeader>
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">{teamName}</h2>
                    <p className="text-xl font-bold">{score}/{wickets}</p>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">Batter</TableHead>
                            <TableHead>Run</TableHead>
                            <TableHead>F11Points</TableHead>
                            <TableHead>Fours</TableHead>
                            <TableHead>Sixes</TableHead>
                            <TableHead className="hidden lg:table-cell">Strike Rate</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {batters.length > 0 && batters.map((batter) => {
                            let battingClassName = ``
                            let strikeRateClassName = ``
                            if (batter.run >= 100) {
                                battingClassName = 'bg-emerald-700 text-white shadow'
                            } else if (batter.run >= 75) {
                                battingClassName = 'bg-emerald-600 text-white shadow'
                            } else if (batter.run >= 50) {
                                battingClassName = 'bg-emerald-500 text-white shadow'
                            } else if (batter.run >= 30) {
                                battingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                            }

                            if (batter.strikeRate > 150) {
                                strikeRateClassName = 'bg-emerald-50 text-emerald-700 shadow'
                            }

                            return <TableRow key={batter.playerId}>
                                <TableCell className="capitalize">
                                    <Link href={`/view/player/${batter.playerId}/${batter.matchFormat?.toLowerCase()}`} className="text-blue-700 hover:underline">{batter.playerId.replaceAll('_', ' ')}</Link>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`p-1 block w-10 h-5 leading-[1] text-center rounded ${battingClassName}`}
                                    >
                                        {batter.run}
                                    </span>
                                </TableCell>
                                <TableCell>{batter.f11points}</TableCell>
                                <TableCell>{batter.four}</TableCell>
                                <TableCell>{batter.six}</TableCell>
                                <TableCell className={`capitalize hidden lg:table-cell text-sm`}>
                                    <span className={`p-1 rounded leading-[1] ${strikeRateClassName}`}>
                                        {Math.round(batter.strikeRate)}
                                    </span>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default BattingData
