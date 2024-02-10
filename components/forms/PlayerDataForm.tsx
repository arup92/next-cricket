'use client'

import SecNotFound from '@/app/not-found-section'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { GoCheck, GoCode } from 'react-icons/go'
import { z } from 'zod'
import ListPlayersEdit from '../dashboard/ListPlayersEdit'
import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const formSchema = z.object({
    playerName: z.string().trim().optional(),
    team: z.string().trim().min(2, 'Minimum 2 characters').optional()
})

const PlayerDataForm = () => {
    const [playerData, setPlayerData] = useState<any[]>()
    const [selectOpen, setSelectOpen] = useState(false)
    const [team, setTeam] = useState<string>('')

    const onSubmit = (values: any) => {
        const params = new URLSearchParams(values)
        setTeam(params.get('team') || '')

        axios.get(`/api/dashboard/get-players?${params.toString()}`)
            .then(response => {
                setPlayerData(response.data)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    // Hook Form
    const {
        formState: { errors },
        handleSubmit,
        setValue,
        watch,
        register
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(formSchema)
    })

    // React Query
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
        queryKey: ['teams',],
        queryFn: getTeams
    })

    // Reset all Active players
    const handleReset = async (teamId: string) => {
        const postBody = {
            teamId: teamId
        }

        await axios.patch('/api/dashboard/edit-player/resetActives', postBody)
            .then(response => {
                if (response.status === 200) {
                    toast.success(response.data)
                    window.location.reload()
                } else {
                    toast.error(response.data)
                }
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-8 items-center">
                <div>
                    <Input
                        type='text'
                        className='min-w-full'
                        placeholder='Player Name'
                        {...register('playerName')}
                    />
                </div>

                <p>OR</p>

                <div>
                    <Popover open={selectOpen} onOpenChange={setSelectOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={selectOpen}
                                className="w-full justify-between bg-white"
                            >
                                {Teams && watch().team ?
                                    Teams.find((team: any) => team.teamId === watch().team.toUpperCase()).teamId :
                                    'Team'
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
                                                setValue('team', currentValue.toUpperCase())
                                                setSelectOpen(false)
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

                <Button>Submit</Button>
            </form>

            {team && <div className='flex justify-end mb-3'><Button onClick={() => { handleReset(team) }}>Reset Active Players</Button></div>}

            {playerData && (playerData.length > 0 ? <ListPlayersEdit playerData={playerData} /> : <SecNotFound />)}
        </>
    )
}

export default PlayerDataForm
