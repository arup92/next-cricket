import { BowlingTypeConst } from '@/types/BowlingDataType';
import { PlayerTypeConst } from '@/types/Player';
import { getFullNameByCode } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiExternalLink } from 'react-icons/hi';
import { TbEdit } from "react-icons/tb";
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ListPlayersEditProps {
    playerData: any[]
}

const formSchema = z.object({
    playerId: z.string().trim().optional(),
    description: z.string().trim().optional(),
    playerType: z.enum(PlayerTypeConst).optional(),
    bowlingType: z.enum(BowlingTypeConst).optional(),
})

const ListPlayersEdit: React.FC<ListPlayersEditProps> = ({ playerData }) => {
    const [playerId, setPlayerId] = useState<string>('')
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [dialogIndexNumber, setDialogIndexNumber] = useState<number>(-1)

    const submitPlayer = async (values: any) => {
        values.playerId = playerId

        await axios.patch('/api/dashboard/edit-player', values)
            .then(response => {
                if (response.status === 200) {
                    toast.success(response.data)
                    console.log(playerData[dialogIndexNumber], values);

                    if (values.playerType) {
                        playerData[dialogIndexNumber].playerType = values.playerType
                    }

                    if (values.bowlingType) {
                        playerData[dialogIndexNumber].bowlingType = values.bowlingType
                    }
                } else {
                    toast.error(response.data)
                }
            })
            .catch(err => {
                toast.error(err.message)
            })

        setIsDialogOpen(false)
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
            {playerData.length > 0 && playerData.map((player: any, index: number) => <Card key={index} className='mb-4'>
                <CardContent className='py-2 px-4 flex items-center'>
                    <div className='w-[25%]'>
                        <Link
                            className='text-gray-700 hover:underline'
                            target='_blank'
                            rel='nofollow'
                            href={`https://www.sportskeeda.com/player/${player.playerId.replaceAll('_', '-')}`}
                        >
                            {player.playerName}  <HiExternalLink className='inline mb-[3px]' />
                        </Link>
                    </div>

                    <div className='w-[25%] text-muted-foreground'>
                        {getFullNameByCode(player.playerCountryId)}
                    </div>

                    <div className='w-[25%] text-muted-foreground'>
                        {player.playerType ? player.playerType : (
                            <span className='text-sm'>NA</span>
                        )}
                    </div>

                    <div className='w-[15%] text-muted-foreground'>
                        {player.bowlingType ? player.bowlingType : (
                            <span className='text-sm'>NA</span>
                        )}
                    </div>

                    <div className='w-[10%]'>
                        <Dialog open={(dialogIndexNumber === index && isDialogOpen) ? true : false} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setPlayerId(player.playerId)
                                        setDialogIndexNumber(index)
                                    }}>
                                    <TbEdit />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='mb-3'>{player.playerName}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(submitPlayer)}>
                                    <div className='mb-4'>
                                        <Input
                                            type='text'
                                            className='min-w-full'
                                            placeholder='Description'
                                            {...register('description')}
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <Select
                                            onValueChange={(selectedValue: string) => setValue('playerType', selectedValue)}
                                            defaultValue={!!player.playerType ? player.playerType : 'NA'}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Player Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {PlayerTypeConst.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='mb-4'>
                                        <Select
                                            onValueChange={(selectedValue: string) => setValue('bowlingType', selectedValue)}
                                            defaultValue={!!player.bowlingType ? player.bowlingType : 'NA'}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Bowling Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {BowlingTypeConst.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button className='w-full'>Submit</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>)}
        </>
    )
}

export default ListPlayersEdit
