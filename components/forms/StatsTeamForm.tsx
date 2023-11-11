import { Teams } from "@/utils/Teams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
    teamA: z.enum(Teams, {
        errorMap: () => ({
            message: 'Please select Team A',
        }),
    }),
    teamB: z.enum(Teams, {
        errorMap: () => ({
            message: 'Please select Team B',
        }),
    }),
})

interface StatsTeamFormProps {
    handleData: (item: any) => void
}

const StatsTeamForm: React.FC<StatsTeamFormProps> = ({ handleData }) => {
    const [teamStat, setTeamStat] = useState('')

    const getCustomMatches = async (): Promise<any> => {
        let teams: string[] = []
        let teamsString = teamStat.split('&')
        teamsString.forEach(team => {
            teams.push(team.split('=')[1])
        })

        return await axios.all([
            axios.get(`/api/view/stats-h2h?${teamStat}`),
            axios.get(`/api/view/stats-team?team=${teams[0]}`),
            axios.get(`/api/view/stats-team?team=${teams[1]}`),
            axios.get(`/api/view/stats-new-11-bat?${teamStat}`),
            axios.get(`/api/view/stats-new-11-bowl?${teamStat}`),
        ]).then(axios.spread((h2h, sTeamA, sTeamB, new11bat, new11bowl) => {
            handleData({
                h2h: h2h.data,
                sTeamA: sTeamA.data,
                sTeamB: sTeamB.data,
                new11bat: new11bat.data,
                new11bowl: new11bowl.data
            })

            return {
                h2h: h2h.data,
                sTeamA: sTeamA.data,
                sTeamB: sTeamB.data,
                new11bat: new11bat.data,
                new11bowl: new11bowl.data
            }
        })).catch(err => {
            console.log(err)
            return []
        })
    }

    // useQuery on form submit
    const { data, refetch, isError, isRefetching } = useQuery({
        queryKey: ['matches', teamStat],
        queryFn: getCustomMatches,
        enabled: false,
        refetchOnWindowFocus: false,
    })

    const onSubmit = (values: any) => {
        let queryParams = ''
        if (Teams.includes(values.teamA) && Teams.includes(values.teamB)) {
            queryParams = `teamA=${values.teamA}&teamB=${values.teamB}`
        }
        // Set team for useQuery
        setTeamStat(queryParams)
    }

    useEffect(() => {
        if (teamStat) {
            refetch()
        }
    }, [refetch, teamStat])

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

                <Button>Submit</Button>
            </form>

            {errors.teamA && (
                <p className="mb-8">{errors.teamA.message as any}</p>
            )}
            {errors.teamB && (
                <p className="mb-8">{errors.teamB.message as any}</p>
            )}
        </>
    )
}

export default StatsTeamForm
