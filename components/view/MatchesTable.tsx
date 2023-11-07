import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface MatchesTableProps {
    matches: Matches[]
}

const MatchesTable: React.FC<MatchesTableProps> = ({ matches }) => {
    const router = useRouter()
    const handleUpdateURL = (teamAId: string, teamBId: string) => {
        router.push(`./view/match?teamA=${teamAId}&teamB=${teamBId}`)
    }

    return (
        <Card>
            <CardContent className="py-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">Match</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Bat First</TableHead>
                            <TableHead>View Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matches && matches.map((match) => {
                            const date = new Date(match.matchDate)
                            const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

                            return <TableRow key={match.id}>
                                <TableCell className="font-medium">
                                    <p className="font-semibold">{match.teamAId} vs {match.teamBId}</p>
                                    <p className="text-sm text-muted-foreground">{match.venue.venueName}, {match.venue?.venueCountryId}</p>
                                </TableCell>
                                <TableCell>{date.toLocaleString('en-IN', options)}</TableCell>
                                <TableCell>{match.batFirst}</TableCell>
                                <TableCell>{match.result}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleUpdateURL(match.teamAId, match.teamBId)} variant="outline">Details</Button>
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
