import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { HiExternalLink } from 'react-icons/hi'
import PlayerView from "../PlayerView"

interface Player11Props {
    player11: any
    matchFormat: string
    className?: string
}

const Player11Bat: React.FC<Player11Props> = ({ player11, matchFormat, className }) => {

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
                                    <TableCell className="capitalize">
                                        <Dialog>
                                            <DialogTrigger>
                                                <span className="capitalize text-blue-700 hover:underline">{player.replaceAll('_', ' ')}</span>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="mb-3">
                                                        <Link className="text-blue-700 hover:underline capitalize flex items-center" href={`/view/player?playerId=${player}&matchFormat=${matchFormat}`} target="_blank">
                                                            {player.replaceAll('_', ' ')} <HiExternalLink className='ml-1' />
                                                        </Link>
                                                    </DialogTitle>
                                                    <PlayerView playerId={player} matchFormat={matchFormat} />
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {player11[player].map((score: number, i: number) => {
                                            let battingClassName = ``
                                            if (score >= 100) {
                                                battingClassName = 'bg-emerald-700 text-white shadow'
                                            } else if (score >= 75) {
                                                battingClassName = 'bg-emerald-600 text-white shadow'
                                            } else if (score >= 50) {
                                                battingClassName = 'bg-emerald-500 text-white shadow'
                                            } else if (score >= 40) {
                                                battingClassName = 'bg-emerald-50 text-emerald-700 shadow'
                                            }

                                            return <span key={i} className={`rounded-sm px-1 mr-1 ${battingClassName}`}>{score}</span>
                                        })}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {Math.round(player11[player].reduce((acc: number, curr: number) => (acc + curr), 0) / player11[player].length)}
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

export default Player11Bat
