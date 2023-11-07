import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BattingDataType } from "@/types/BattingDataType"


interface BattingDataProps {
    data: BattingDataType[]
    className?: string
}
const BattingData: React.FC<BattingDataProps> = ({ data: batters, className }) => {
    return (
        <Card className={`py-3 ${className}`}>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">Batter</TableHead>
                            <TableHead>Run</TableHead>
                            <TableHead>Fours</TableHead>
                            <TableHead>Sixes</TableHead>
                            <TableHead>Strike Rate</TableHead>
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
                            } else if (batter.run >= 40) {
                                battingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                            }

                            if (batter.strikeRate > 150) {
                                strikeRateClassName = 'bg-emerald-50 text-emerald-700 shadow'
                            }

                            return <TableRow key={batter.playerId}>
                                <TableCell className="capitalize">{batter.playerId.replaceAll('_', ' ')}</TableCell>
                                <TableCell><span className={`p-1 block w-10 h-5 leading-[1] text-center rounded ${battingClassName}`}>{batter.run}</span></TableCell>
                                <TableCell>{batter.four}</TableCell>
                                <TableCell>{batter.six}</TableCell>
                                <TableCell><span className={`p-1 rounded leading-[1] ${strikeRateClassName}`}>{batter.strikeRate}</span></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default BattingData
