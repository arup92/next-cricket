import { MatchFormat } from '@/types/MatchFormat'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoCheck, GoCode } from "react-icons/go"
import { RiSearch2Line } from 'react-icons/ri'
import { z } from 'zod'
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const formSchema = z.object({
    matchFormat: z.string().optional(),
    team: z.string().optional(),
    view: z.string().optional()
})

interface RankFilterFormProps {
    fields: any[]
}

const RankFilterForm: React.FC<RankFilterFormProps> = ({ fields }) => {
    const [loading, setLoading] = useState(false)
    const [tOpen, setTOpen] = useState(false)
    const [prvValue, setPrvValue] = useState<string>('{}')
    const router = useRouter()

    if (fields?.[0] === 'index') {
        fields[0] = 'ODI'
    }
    let matchFormat = fields?.[0] || 'ODI'
    matchFormat = matchFormat.toUpperCase()

    const team = fields?.[1] || 'all'
    const view = fields?.[2] || '10'

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
            matchFormat,
            team,
            view,
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

    let { data: Teams } = useQuery({
        queryKey: ['teams', getValues().matchFormat],
        queryFn: getTeams,
    })

    // Apeend to the teams list
    if (Teams) {
        Teams = [{ teamId: 'ALL' }, ...Teams]
    }

    const onSubmit = async (values: any) => {
        if (JSON.stringify(values) !== prvValue) {
            let path = ''
            setLoading(true) // Loading

            // Update the previous value
            setPrvValue(JSON.stringify(values))

            path = `/${values.matchFormat || 'odi'}/${values.team || 'all'}/${values.view || '10'}`
            router.push(`${path.toLowerCase()}`)

            setLoading(false) // Loading false
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex justify-between gap-3">
                <div>
                    <Select
                        onValueChange={(selectedValue: string) => {
                            setValue('matchFormat', selectedValue)
                            setValue('team', 'all')
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={!watch().matchFormat ? matchFormat : watch().matchFormat} />
                        </SelectTrigger>
                        <SelectContent>
                            {MatchFormat.filter(format => format !== 'WPL').map((format) => (
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
                                    Teams.find(
                                        (team: any) => team?.teamId.toUpperCase() === watch()?.team?.toUpperCase()
                                    )?.teamId :
                                    team.toUpperCase()
                                }
                                <span className="rotate-90"><GoCode /></span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom" avoidCollisions={false} className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search Team..." />
                                <CommandEmpty>No Team Found</CommandEmpty>
                                <CommandGroup>
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
                        onValueChange={(selectedValue: string) => setValue('view', selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={!watch().view ? view : watch().view} />
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
