'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MatchFormat } from "@/types/MatchFormat";
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getVenues } from "@/utils/reactQuery";

const formSchema = z.object({
    matchFormat: z.enum(MatchFormat, {
        errorMap: () => ({
            message: 'Please select Format',
        }),
    }),
    teamA: z.string().min(2, 'Enter valid details'),
    teamB: z.string().min(2, 'Enter valid details'),
    venueId: z.string().trim().min(1, 'Enter valid details').optional(),
})

interface StatsTeamFormV2StatsTeamFormV2CompactProps {
    slugs?: any[]
    isFetched?: (value: boolean) => void
}

const StatsTeamFormV2Compact: React.FC<StatsTeamFormV2StatsTeamFormV2CompactProps> = ({ slugs, isFetched }) => {
    const [open, setOpen] = useState(false)
    const [tAOpen, setTAOpen] = useState(false)
    const [tBOpen, setTBOpen] = useState(false)

    const router = useRouter()

    useEffect(() => {
        isFetched && isFetched(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = (values: any) => {
        let path = ''

        if (Teams.map((item: any) => item.teamId).includes(values.teamA)
            && Teams.map((item: any) => item.teamId).includes(values.teamB)
            && MatchFormat.includes(values.matchFormat)) {
            path = `/${values.teamA}/${values.teamB}/${values.matchFormat}/${values?.venueId}`
            router.push(`/view/create-new-11${path.toLowerCase()}`)
            isFetched && isFetched(true)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // React Query: Get Venues
    const venues = useQuery({
        queryKey: ['allvenues'],
        queryFn: getVenues
    })

    // React Query: Get Teams
    const getTeams = async () => {
        return await axios.get(`/api/view/teams-get?teamType=${getValues().matchFormat}`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
                return []
            })
    }

    const { data: Teams } = useQuery({
        queryKey: ['teams', getValues().matchFormat],
        queryFn: getTeams,
        enabled: !!getValues().matchFormat
    })

    return (
        <>
            <div className="px-5 py-3 mb-3 border rounded-md shadow-sm lg:items-center lg:justify-between lg:flex text-card-foreground bg-card">
                <div className="text-center">
                    <h2 className="inline-block mr-auto text-lg font-bold lg:inline lg:text-2xl">Make A New 11</h2>
                </div>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="lg:flex lg:justify-between">
                        <div className="mb-3 lg:mb-0 lg:w-[23%]">
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

                        <div className="flex justify-between gap-2 mb-3 lg:mb-0 lg:w-[46%]">
                            <div className="w-1/2">
                                <Popover open={tAOpen} onOpenChange={setTAOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={tAOpen}
                                            className="justify-between w-full bg-white"
                                        >
                                            {Teams && watch().teamA ?
                                                Teams.find((team: any) => team?.teamId === watch()?.teamA?.toUpperCase())?.teamId :
                                                'Team A'
                                            }
                                            <span className="rotate-90"><GoCode /></span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent side="bottom" avoidCollisions={false} className="w-full p-0">
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

                            <div className="w-1/2">
                                <Popover open={tBOpen} onOpenChange={setTBOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={tBOpen}
                                            className="justify-between w-full bg-white"
                                        >
                                            {Teams && watch().teamB ?
                                                Teams.find((team: any) => team?.teamId === watch()?.teamB?.toUpperCase())?.teamId :
                                                'Team B'
                                            }
                                            <span className="rotate-90"><GoCode /></span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent side="bottom" avoidCollisions={false} className="w-full p-0">
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
                        </div>

                        <div className="mb-3 lg:mb-0 lg:w-[23%]">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="justify-between w-full bg-white"
                                    >
                                        {venues.data && watch().venueId ?
                                            venues.data.find((venue: any) => venue.venueId === watch().venueId)?.venueName :
                                            'Venue'
                                        }
                                        <span className="rotate-90"><GoCode /></span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent side="bottom" avoidCollisions={false} className="w-full p-0">
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

                        <div className="w-full lg:w-auto text-center">
                            <Button>Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

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

export default StatsTeamFormV2Compact
