'use client'

import { Teams } from '@/types/Teams'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { TbEdit } from "react-icons/tb";

const formSchema = z.object({
    playerName: z.string().trim().optional(),
    team: z.enum(Teams, {
        errorMap: () => ({
            message: 'Please select Team',
        }),
    })
})

const EditPlayerData = () => {
    const onSubmit = (values: any) => {
        console.log(values);

        axios.post('/api/add-match', values)
            .then(response => {

            })
            .catch(error => {

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

            <div>
                <Card className='mb-4'>
                    <CardContent className='py-2 px-4 flex items-center'>
                        <div className='w-[25%]'>
                            Rohit Sharma
                        </div>

                        <div className='w-[25%]'>
                            India
                        </div>

                        <div className='w-[25%]'>
                            Batsman
                        </div>

                        <div className='w-[15%]'>
                            Spin
                        </div>

                        <div className='w-[10%]'>
                            <Button variant="outline"><TbEdit /></Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='py-2 px-4 flex items-center'>
                        <div className='w-[25%]'>
                            Mohammad Shami
                        </div>

                        <div className='w-[25%]'>
                            India
                        </div>

                        <div className='w-[25%]'>
                            Bowler
                        </div>

                        <div className='w-[15%]'>
                            Fast
                        </div>

                        <div className='w-[10%]'>
                            <Button variant="outline"><TbEdit /></Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default EditPlayerData
