'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Teams } from "@/utils/Teams";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CenteredArea from "../customUi/CenteredArea";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
    teamA: z.enum(Teams, {
        errorMap: () => ({
            message: 'Please select Team A',
        }),
    }),
    teamB: z.enum(Teams).optional(),
})

const MatchesView = () => {
    const [matches, setMatches] = useState<Matches[]>([])
    const {
        formState: { errors },
        register,
        handleSubmit,
        getValues,
        setValue,
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(formSchema)
    })

    useEffect(() => {
        axios.get(`/api/view/matches-get`)
            .then(response => {
                setMatches(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {

    }, [matches])

    const onSubmit = (values: any) => {
        let queryParams = ``
        if (Teams.includes(values.teamA) && Teams.includes(values.teamB)) {
            queryParams = `teamA=${values.teamA}&teamB=${values.teamB}`

            if (values.teamA === values.teamB) {
                queryParams = `teamA=${values.teamA}`
            }
        } else if (Teams.includes(values.teamA)) {
            queryParams = `teamA=${values.teamA}`
        }

        // The url
        let getUrl = `/api/view/matches-get?${queryParams}`

        // Axios
        axios.get(getUrl)
            .then(response => setMatches(response.data))
            .catch(err => console.log(err))
    }

    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-8">
                <div>
                    <Select
                        onValueChange={(selectedValue: string) => setValue('teamA', selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Team A" />
                        </SelectTrigger>
                        <SelectContent>
                            {Teams.map((team) => (
                                <SelectItem key={team} value={team}>
                                    {team}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Select
                        onValueChange={(selectedValue: string) => setValue('teamB', selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Team B" />
                        </SelectTrigger>
                        <SelectContent>
                            {Teams.map((team) => (
                                <SelectItem key={team} value={team}>
                                    {team}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button>Submit</Button>
            </form>

            {errors.teamA && (
                <p className="mb-8">{errors.teamA.message as any}</p>
            )}

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
                            {matches.map((match) => {
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
                                        <Button variant="outline">Details</Button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </CenteredArea>
    )
}

export default MatchesView
