import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateString } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface MatchesTableProps {
    matches: Matches[]
    deleteMatch: (matchId: any) => void
}

const MatchesTable: React.FC<MatchesTableProps> = ({ matches, deleteMatch }) => {
    const router = useRouter()
    const handleUpdateURL = (matchId: string) => {
        router.push(`./view/match?matchId=${matchId}`)
    }

    return (
        <Card>
            <CardContent className="py-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[20%]">Match</TableHead>
                            <TableHead>Format</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Bat First</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matches && matches.map((match) => {
                            const date = new Date(match.matchDate)

                            return <TableRow key={match.id}>
                                <TableCell className="font-medium">
                                    <p className="font-semibold">{match.teamAId} vs {match.teamBId}</p>
                                    <p className="text-sm text-muted-foreground">{match.venue.venueName}, {match.venue?.venueCountryId}</p>
                                </TableCell>
                                <TableCell>{match.matchFormat}</TableCell>
                                <TableCell>{formatDateString(date.toString())}</TableCell>
                                <TableCell>{match.result}</TableCell>
                                <TableCell>{match.batFirst}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleUpdateURL(match.id.toString())} variant="outline">Details</Button>
                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger>
                                            <span className="text-red-500">Delete</span>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <span className="text-sm cursor-pointer" onClick={() => deleteMatch(match.id)}>Confirm?</span>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default MatchesTable
