import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MatchFormat } from "@/types/MatchFormat";
import { Teams } from "@/types/Teams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoCheck, GoCode } from "react-icons/go";
import { z } from "zod";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
    matchFormat: z.enum(MatchFormat, {
        errorMap: () => ({
            message: 'Please select Format',
        }),
    }),
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
    venueId: z.string().trim().min(1, 'Enter valid details').optional(),
})

interface StatsTeamFormProps {
    handleData: (item: any) => void
}

const StatsTeamForm: React.FC<StatsTeamFormProps> = ({ handleData }) => {
    const [teamStat, setTeamStat] = useState('')
    const [open, setOpen] = useState(false)

    const getCustomMatches = async (): Promise<any> => {
        let statParams: string[] = []
        let paramString = teamStat.split('&')
        paramString.forEach(param => {
            statParams.push(param.split('=')[1])
        })

        return await axios.all([
            axios.get(`/api/view/stats-h2h?${teamStat}`),
            axios.get(`/api/view/stats-team?team=${statParams[0]}&matchFormat=${statParams[2]}`),
            axios.get(`/api/view/stats-team?team=${statParams[1]}&matchFormat=${statParams[2]}`),
            axios.get(`/api/view/stats-new-11?${teamStat}`),
            axios.get(`/api/view/stats-venue?venueId=${statParams[3]}&matchFormat=${statParams[2]}`),
        ]).then(axios.spread((h2h, sTeamA, sTeamB, new11, sVenue) => {
            handleData({
                h2h: h2h.data,
                sTeamA: sTeamA.data,
                sTeamB: sTeamB.data,
                new11: new11.data,
                sVenue: sVenue.data
            })

            return {
                h2h: h2h.data,
                sTeamA: sTeamA.data,
                sTeamB: sTeamB.data,
                new11: new11.data,
                sVenue: sVenue.data
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
        if (Teams.includes(values.teamA) && Teams.includes(values.teamB) && MatchFormat.includes(values.matchFormat)) {
            queryParams = `teamA=${values.teamA}&teamB=${values.teamB}&matchFormat=${values.matchFormat}&venueId=${values.venueId}`
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
        watch
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(formSchema)
    })

    // Get Venues
    const getVenues = async (): Promise<any> => {
        return await axios.get(`/api/view/venues-get`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
                return []
            })
    }

    const venues = useQuery({
        queryKey: ['venues'],
        queryFn: getVenues
    })

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-8">
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
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[150px] justify-between"
                            >
                                {venues.data && watch().venueId ?
                                    venues.data.find((venue: any) => venue.venueId === watch().venueId)?.venueName :
                                    'Venue'
                                }
                                <span className="rotate-90"><GoCode /></span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[150px] p-0">
                            <Command>
                                <CommandInput placeholder="Search venue..." />
                                <CommandEmpty>No venue found.</CommandEmpty>
                                <CommandGroup>
                                    {venues.data && venues.data.map((venue: any) => (
                                        <CommandItem
                                            key={venue.venueId}
                                            value={venue.venueId}
                                            onSelect={(currentValue) => {
                                                setValue('venueId', currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            {venue.venueName}
                                            <span className={watch().venueId === venue.venueId ? 'ml-auto opacity-100' : 'opacity-0'}>
                                                <GoCheck />
                                            </span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <Button>Submit</Button>
            </form>

            {errors.matchFormat && (
                <p className="mb-5">{errors.matchFormat.message as any}</p>
            )}
            {!errors.matchFormat && errors.teamA && (
                <p className="mb-5">{errors.teamA.message as any}</p>
            )}
            {!errors.matchFormat && !errors.teamA && errors.teamB && (
                <p className="mb-5">{errors.teamB.message as any}</p>
            )}
        </>
    )
}

export default StatsTeamForm
