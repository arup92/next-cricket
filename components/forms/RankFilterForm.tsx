import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { GoCheck, GoCode } from "react-icons/go"
import { Button } from "../ui/button"
import { RiSearch2Line } from 'react-icons/ri'
import { MatchFormat } from '@/types/MatchFormat'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const formSchema = z.object({
    matchFormat: z.string().min(2).optional(),
    team: z.string().optional(),
    view: z.number().min(1).optional()
})

interface RankFilterFormProps {
    updatePlayers: (playerList: any[]) => void
}

const RankFilterForm: React.FC<RankFilterFormProps> = ({ updatePlayers }) => {
    const [loading, setLoading] = useState(false)
    const [tOpen, setTOpen] = useState(false)
    const [prvValue, setPrvValue] = useState<string>('{}')

    // Hook Form
    const {
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
        watch
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            matchFormat: 'ODI',
            team: '',
            view: 10,
        }
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
    })

    const onSubmit = async (values: any) => {
        if (JSON.stringify(values) !== prvValue) {
            setLoading(true) // Loading

            // Update the previous value
            setPrvValue(JSON.stringify(values))
            const queryString = new URLSearchParams(values).toString()

            await axios.get(`/api/view/ranking?${queryString}`)
                .then(response => {
                    updatePlayers(response.data)
                    setLoading(false) // Loading off
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex justify-between gap-3">
                <div>
                    <Select
                        onValueChange={(selectedValue: string) => setValue('matchFormat', selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={!watch().matchFormat ? 'ODI' : watch().matchFormat} />
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

                <div className="w-1/2">
                    <Popover open={tOpen} onOpenChange={setTOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={tOpen}
                                className="justify-between w-full bg-white"
                            >
                                {Teams && watch().team ?
                                    Teams.find((team: any) => team?.teamId === watch()?.team?.toUpperCase())?.teamId :
                                    'All Teams'
                                }
                                <span className="rotate-90"><GoCode /></span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom" avoidCollisions={false} className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search Team..." />
                                <CommandEmpty>No Team Found</CommandEmpty>
                                <CommandGroup>
                                    <CommandItem
                                        key="unset"
                                        value=''
                                        onSelect={(currentValue) => {
                                            setValue('team', currentValue.toUpperCase())
                                            setTOpen(false)
                                        }}
                                    >
                                        All Teams
                                        <span className={watch().team === '' ? 'ml-auto opacity-100' : 'opacity-0'}>
                                            <GoCheck />
                                        </span>
                                    </CommandItem>
                                    {Teams && Teams.map((team: any) => (
                                        <CommandItem
                                            key={team.teamId}
                                            value={team.teamId}
                                            onSelect={(currentValue) => {
                                                setValue('team', currentValue.toUpperCase())
                                                setTOpen(false)
                                            }}
                                        >
                                            {team.teamId}
                                            <span className={watch().team === team.teamId ? 'ml-auto opacity-100' : 'opacity-0'}>
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
                        onValueChange={(selectedValue: string) => setValue('view', parseInt(selectedValue))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={!watch().view ? '10' : watch().view} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key={`1`} value={'10'}>
                                10
                            </SelectItem>
                            <SelectItem key={`2`} value='20'>
                                20
                            </SelectItem>
                            <SelectItem key={`3`} value='50'>
                                50
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button>
                    {loading ? <>
                        <svg className="absolute w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> <span className="invisible opacity-0"><RiSearch2Line /></span>
                    </> : <RiSearch2Line />}
                </Button>
            </div>
        </form>
    )
}

export default RankFilterForm
