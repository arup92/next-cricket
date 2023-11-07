'use client'

import { Teams } from "@/utils/Teams";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CenteredArea from "../customUi/CenteredArea";
import { Button } from "../ui/button";

import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import MatchesTable from "./MatchesTable";

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
    const [teams, setTeams] = useState('')

    // React Query Functions
    const getMatches = async (): Promise<Matches[]> => {
        return await axios.get(`/api/view/matches-get`)
            .then(response => {
                setMatches(response.data)
                return response.data
            })
            .catch(err => {
                console.log(err)
                return []
            })
    }

    const getCustomMatches = async (): Promise<Matches[]> => {
        return await axios.get(`/api/view/matches-get?${teams}`)
            .then(response => {
                setMatches(response.data)
                return response.data
            })
            .catch(err => {
                console.log(err)
                return []
            })
    }

    // React Query
    useQuery({
        queryKey: ['matches'],
        queryFn: getMatches
    })

    // useQuery on form submit
    const { data, refetch, isError, isRefetching } = useQuery({
        queryKey: ['matches', teams],
        queryFn: getCustomMatches,
        enabled: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        refetch()
    }, [refetch, teams]);

    // Hook Form
    const {
        formState: { errors },
        handleSubmit,
        getValues,
        setValue,
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(formSchema)
    })

    const onSubmit = (values: any) => {
        let queryParams = ''
        if (Teams.includes(values.teamA) && Teams.includes(values.teamB)) {
            queryParams = `teamA=${values.teamA}&teamB=${values.teamB}`

            if (values.teamA === values.teamB) {
                queryParams = `teamA=${values.teamA}`
            }
        } else if (Teams.includes(values.teamA)) {
            queryParams = `teamA=${values.teamA}`
        }

        // Set team for useQuery
        setTeams(queryParams)
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

            <MatchesTable matches={matches} />

        </CenteredArea>
    )
}

export default MatchesView
