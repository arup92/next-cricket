import { MatchFormat } from "@/types/MatchFormat";
import { Teams } from "@/types/Teams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
    teamA: z.enum(Teams).optional(),
    teamB: z.enum(Teams).optional(),
    matchFormat: z.enum(MatchFormat).optional(),
})

interface SearchTeamsFormProps {
    handleData: (item: any) => void
}

const SearchTeamsForm: React.FC<SearchTeamsFormProps> = ({ handleData }) => {
    const [teams, setTeams] = useState('')

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

        // Match Format
        if (MatchFormat.includes(values.matchFormat)) {
            queryParams += `&matchFormat=${values.matchFormat}`
        }

        // Set team for useQuery
        setTeams(queryParams)
    }

    const getCustomMatches = async (): Promise<Matches[]> => {
        return await axios.get(`/api/view/matches-get?${teams}`)
            .then(response => {
                handleData(response.data)
                return response.data
            })
            .catch(err => {
                console.log(err)
                return []
            })
    }

    // useQuery on form submit
    const { data, refetch, isError, isRefetching } = useQuery({
        queryKey: ['matches', teams],
        queryFn: getCustomMatches,
        enabled: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        refetch()
    }, [refetch, teams])

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

    return (
        <>
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

                <div>
                    <Select
                        onValueChange={(selectedValue: string) => {
                            setValue('matchFormat', selectedValue)
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                            {MatchFormat.map((format) => (
                                <SelectItem key={format} value={format}>
                                    {format}
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
        </>
    )
}

export default SearchTeamsForm
