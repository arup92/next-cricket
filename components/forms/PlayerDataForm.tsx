'use client'

import { Teams } from '@/types/Teams'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ListPlayersEdit from '../dashboard/ListPlayersEdit'

const formSchema = z.object({
    playerName: z.string().trim().optional(),
    team: z.enum(Teams, {
        errorMap: () => ({
            message: 'Please select Team',
        }),
    })
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

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-8">
                <div>
                    <Input
                        type='text'
                        className='min-w-full'
                        placeholder='Player Name'
                        {...register('playerName')}
                    />
                </div>

                <div>
                    <Select
                        onValueChange={(selectedValue: string) => setValue('team', selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Team" />
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

            <ListPlayersEdit playerData={playerData} />
        </>
    )
}

export default PlayerDataForm
