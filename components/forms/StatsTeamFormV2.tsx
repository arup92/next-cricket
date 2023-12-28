import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MatchFormat } from "@/types/MatchFormat";
import { Teams } from "@/types/Teams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
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

interface StatsTeamFormV2 {
    slugs: any[]
}

const StatsTeamFormV2: React.FC<StatsTeamFormV2> = ({ slugs }) => {
    const [open, setOpen] = useState(false)
    const [tAOpen, setTAOpen] = useState(false)
    const [tBOpen, setTBOpen] = useState(false)

    const router = useRouter()

    const onSubmit = (values: any) => {
        let path = ''
        if (Teams.includes(values.teamA) && Teams.includes(values.teamB) && MatchFormat.includes(values.matchFormat)) {
            path = `/${values.teamA}/${values.teamB}/${values.matchFormat}/${values?.venueId}`
            router.push(`/view/create-new-11${path.toLowerCase()}`)
        }
    }

    // Hook Form
    const {
        formState: { errors },
        handleSubmit,
        getValues,
        setValue,
        watch
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(formSchema),
    })

    // Hook Form default values
    useEffect(() => {
        if (!!slugs) {
            setValue('teamA', slugs[0] ? slugs[0].toUpperCase() : '')
            setValue('teamB', slugs[1] ? slugs[1].toUpperCase() : '')
            setValue('matchFormat', slugs[2] ? slugs[2].toUpperCase() : '')
            setValue('venueId', slugs[3] ? slugs[3] : '')
        }
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
        queryKey: ['allvenues'],
        queryFn: getVenues
    })

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
                            <SelectValue placeholder={slugs && slugs[2] ? slugs[2].toUpperCase() : 'Format'} />
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
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[150px] justify-between bg-white"
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

export default StatsTeamFormV2
