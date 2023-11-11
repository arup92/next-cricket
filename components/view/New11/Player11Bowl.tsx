import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Player11Props {
    player11: any
    className?: string
}

const Player11Bowl: React.FC<Player11Props> = ({ player11, className }) => {

    return (
        <>
            {player11 && <Card className={`py-3 ${className}`}>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30%]">Batsman</TableHead>
                                <TableHead>Scores (Last 5)</TableHead>
                                <TableHead>Average (Last 5)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {player11 && Object.keys(player11).map((player, index) => (
                                <TableRow key={index}>
                                    <TableCell className="capitalize">{player.replaceAll('_', ' ')}</TableCell>
                                    <TableCell className="capitalize">
                                        {player11[player].map((score: number, i: number) => {
                                            let bowlingClassName = ``
                                            if (score >= 5) {
                                                bowlingClassName = 'bg-emerald-700 text-white shadow'
                                            } else if (score >= 3) {
                                                bowlingClassName = 'bg-emerald-600 text-white shadow'
                                            } else if (score >= 2) {
                                                bowlingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                                            }

                                            return <span key={i} className={`rounded-sm px-1 mr-1 ${bowlingClassName}`}>{score}</span>
                                        })}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {(player11[player].reduce((acc: number, curr: number) => (acc + curr), 0) / player11[player].length).toFixed(1)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>}
        </>
    )
}

export default Player11Bowl
