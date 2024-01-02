import { MatchFormat } from "@/types/MatchFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { GoCode, GoCheck } from "react-icons/go";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";

const formSchema = z.object({
    teamA: z.string().min(2).optional(),
    teamB: z.string().min(2).optional(),
    matchFormat: z.enum(MatchFormat).optional(),
})

interface SearchTeamsFormProps {
    handleData: (item: any) => void
}

const SearchTeamsForm: React.FC<SearchTeamsFormProps> = ({ handleData }) => {
    const [tAOpen, setTAOpen] = useState(false)
    const [tBOpen, setTBOpen] = useState(false)

    // React Query: Get Teams
    const getTeams = async () => {
        return await axios.get(`/api/view/teams-get`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
                return []
            })
    }

    const { data: Teams } = useQuery({
        queryKey: ['teams'],
        queryFn: getTeams
    })

    const onSubmit = async (values: any) => {
        let queryParams = ``
        if (Teams.map((item: any) => item.teamId).includes(values.teamA)
            && Teams.map((item: any) => item.teamId).includes(values.teamB)) {
            queryParams = `teamA=${values.teamA}&teamB=${values.teamB}`

            if (values.teamA === values.teamB) {
                queryParams = `teamA=${values.teamA}`
            }
        } else if (Teams.map((item: any) => item.teamId).includes(values.teamA)) {
            queryParams = `teamA=${values.teamA}`
        }

        // Match Format
        if (MatchFormat.includes(values.matchFormat)) {
            queryParams += `&matchFormat=${values.matchFormat}`
        }

        // Set team for useQuery
        await axios.get(`/api/view/matches-get?${queryParams}`)
            .then(response => {
                handleData(response.data)
            })
            .catch(err => {
                console.log(err)
                return []
            })
    }

    const getCustomMatches = async (): Promise<Matches[]> => {
        return await axios.get(`/api/view/matches-get`)
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log(err)
                return []
            })
    }

    // Query: on form submit
    const { data: matches } = useQuery({
        queryKey: ['matches'],
        queryFn: getCustomMatches,
        refetchOnWindowFocus: false,
    })

    // Hook Form
    const {
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(formSchema)
    })

    // Send matches to the calling component
    useEffect(() => {
        if (matches) {
            handleData(matches)
        }
    }, [matches])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-8">
                <div>
                    <Popover open={tAOpen} onOpenChange={setTAOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={tAOpen}
                                className="w-[150px] justify-between bg-white"
                            >
                                {Teams && watch().teamA ?
                                    Teams.find((team: any) => team.teamId === watch().teamA.toUpperCase()).teamId :
                                    'Team A'
                                }
                                <span className="rotate-90"><GoCode /></span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[150px] p-0">
                            <Command>
                                <CommandInput placeholder="Search Team..." />
                                <CommandEmpty>No Team Found.</CommandEmpty>
                                <CommandGroup>
                                    {Teams && Teams.map((team: any) => (
                                        <CommandItem
                                            key={team.teamId}
                                            value={team.teamId}
                                            onSelect={(currentValue) => {
                                                setValue('teamA', currentValue.toUpperCase())
                                                setTAOpen(false)
                                            }}
                                        >
                                            {team.teamId}
                                            <span className={watch().teamA === team.teamId ? 'ml-auto opacity-100' : 'opacity-0'}>
                                                <GoCheck />
                                            </span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Popover open={tBOpen} onOpenChange={setTBOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={tBOpen}
                                className="w-[150px] justify-between bg-white"
                            >
                                {Teams && watch().teamB ?
                                    Teams.find((team: any) => team.teamId === watch().teamB.toUpperCase()).teamId :
                                    'Team B'
                                }
                                <span className="rotate-90"><GoCode /></span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[150px] p-0">
                            <Command>
                                <CommandInput placeholder="Search Team..." />
                                <CommandEmpty>No Team Found.</CommandEmpty>
                                <CommandGroup>
                                    {Teams && Teams.map((team: any) => (
                                        <CommandItem
                                            key={team.teamId}
                                            value={team.teamId}
                                            onSelect={(currentValue) => {
                                                setValue('teamB', currentValue.toUpperCase())
                                                setTBOpen(false)
                                            }}
                                        >
                                            {team.teamId}
                                            <span className={watch().teamB === team.teamId ? 'ml-auto opacity-100' : 'opacity-0'}>
                                                <GoCheck />
                                            </span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
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
