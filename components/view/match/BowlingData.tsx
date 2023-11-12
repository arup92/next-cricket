import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BowlingDataType } from "@/types/BowlingDataType"
import Link from "next/link"


interface BattingDataProps {
    data: BowlingDataType[]
    className?: string
}
const BattingData: React.FC<BattingDataProps> = ({ data: bowlers, className }) => {
    return (
        <Card className={`py-3 ${className}`}>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">Bowler</TableHead>
                            <TableHead>Wickets</TableHead>
                            <TableHead>Maidens</TableHead>
                            <TableHead>Economy</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bowlers.length > 0 && bowlers.map((bowler) => {
                            let bowlingClassName = ``
                            let ecoClassName = ``
                            if (bowler.wicket >= 5) {
                                bowlingClassName = 'bg-emerald-700 text-white shadow'
                            } else if (bowler.wicket >= 3) {
                                bowlingClassName = 'bg-emerald-600 text-white shadow'
                            } else if (bowler.wicket >= 2) {
                                bowlingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                            }

                            if (bowler.eco < 4) {
                                ecoClassName = 'bg-emerald-50 text-emerald-700 shadow'
                            }

                            return <TableRow key={bowler.playerId}>
                                <TableCell className="capitalize">
                                    <Link href={`/view/player?playerId=${bowler.playerId}`} className="text-blue-700 hover:underline">{bowler.playerId.replaceAll('_', ' ')}</Link>
                                </TableCell>
                                <TableCell><span className={`p-1 block w-5 h-5 leading-[1] text-center rounded-full ${bowlingClassName}`}>{bowler.wicket}</span></TableCell>
                                <TableCell>{bowler.maiden}</TableCell>
                                <TableCell><span className={`p-1 block w-5 h-5 leading-[1] text-center rounded-full ${ecoClassName}`}>{bowler.eco}</span></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default BattingData
