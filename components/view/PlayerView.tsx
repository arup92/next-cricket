'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "../ui/card"
import CenteredArea from "../customUi/CenteredArea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const PlayerView = () => {
    const searchParams = useSearchParams()
    const playerId = searchParams.get('playerId')

    const getPlayerStats = async () => {
        return await axios.get(`/api/view/player-get?playerId=${playerId}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                return []
            })
    }

    const { data } = useQuery({
        queryKey: ['playerStats', playerId],
        queryFn: getPlayerStats
    })

    console.log(data);


    return (
        <>
            <CenteredArea maxWidthClass="max-w-5xl">
                {data && data.playerData && <Card className="mb-3">
                    <CardContent className="py-3">
                        <div className="inline">
                            <h1 className="capitalize inline font-bold text-2xl">{data.playerData.playerName}</h1>
                            <p className="inline"> ({data.playerData.playerCountryId})</p>
                        </div>
                    </CardContent>
                </Card>}

                {data && data.batData.length > 0 &&
                    <Card className="mb-3">
                        <CardContent className="py-3">
                            <h2 className="text-center font-bold mb-3 text-xl">Batting</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Run</TableHead>
                                        <TableHead>Six</TableHead>
                                        <TableHead>Four</TableHead>
                                        <TableHead>Strike Rate</TableHead>
                                        <TableHead>Venue</TableHead>
                                        <TableHead>Opponent</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.batData.map((item: any, index: number) => {
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
                                            <TableCell className="capitalize">{item.venueId.replaceAll('_', ' ')}</TableCell>
                                            <TableCell>{item.oppCountryId}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>}
            </CenteredArea>
        </>
    )
}

export default PlayerView
