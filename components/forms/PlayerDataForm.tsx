'use client'

import SecNotFound from '@/app/not-found-section'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import ListPlayersEdit from '../dashboard/ListPlayersEdit'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const formSchema = z.object({
    playerName: z.string().trim().optional(),
    team: z.string().trim().min(2, 'Minimum 2 characters').optional()
})

const PlayerDataForm = () => {
    const [playerData, setPlayerData] = useState<any[]>([])

    const onSubmit = (values: any) => {
        const params = new URLSearchParams(values).toString()

        axios.get(`/api/dashboard/get-players?${params}`)
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
                    <Select
                        onValueChange={(selectedValue: string) => setValue('team', selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Team" />
                        </SelectTrigger>
                        <SelectContent>
                            {Teams && Teams.map((team: any) => (
                                <SelectItem key={team.teamId} value={team.teamId}>
                                    {team.teamName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button>Submit</Button>
            </form>

            {playerData.length > 0 ? <ListPlayersEdit playerData={playerData} /> : <SecNotFound />}
        </>
    )
}

export default PlayerDataForm
