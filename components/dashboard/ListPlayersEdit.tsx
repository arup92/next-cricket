import { BowlingTypeConst } from '@/types/BowlingDataType';
import { PlayerTypeConst } from '@/types/Player';
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
import SwitchInactive from './SwitchInactive';


interface ListPlayersEditProps {
    playerData: any[]
    team: string
}

const formSchema = z.object({
    playerId: z.string().trim().optional(),
    description: z.string().trim().optional(),
    playerType: z.enum(PlayerTypeConst).optional(),
    bowlingType: z.enum(BowlingTypeConst).optional(),
    active: z.string().min(2).max(3).trim().optional(),
})

const ListPlayersEdit: React.FC<ListPlayersEditProps> = ({ playerData, team }) => {
    const [playerId, setPlayerId] = useState<string>('')
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [dialogIndexNumber, setDialogIndexNumber] = useState<number>(-1)

    console.log(playerData);


    const submitPlayer = async (values: any) => {
        values.playerId = playerId
        values.teamId = team

        await axios.patch('/api/dashboard/edit-player', values)
            .then(response => {
                if (response.status === 200) {
                    toast.success(response.data)

                    if (values.playerType) {
                        playerData[dialogIndexNumber].playerType = values.playerType
                    }

                    if (values.bowlingType) {
                        playerData[dialogIndexNumber].bowlingType = values.bowlingType
                    }

                    if (values.active) {
                        playerData[dialogIndexNumber].active = values.active
                    }
                } else {
                    toast.error(response.data)
                }
            })
            .catch(err => {
                toast.error(err.message)
            })

        setIsDialogOpen(false)
        reset()
    }

    // Hook Form
    const {
        formState: { errors },
        handleSubmit,
        setValue,
        register,
        reset
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(formSchema)
    })

    // Switch Button
    const handleSwitchChange = async (checked: boolean, id: string) => {
        const postBody = {
            playerId: id,
            active: checked ? 'yes' : 'no',
            teamId: team
        }

        await axios.patch('/api/dashboard/edit-player', postBody)
            .then(response => {
                if (response.status === 200) {
                    toast.success(response.data)
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
            <div className='flex items-center px-4 py-2 mb-2'>
                <div className='w-[25%]'>
                    Player
                </div>

                <div className='w-[25%] text-muted-foreground'>
                    Teams
                </div>

                <div className='w-[25%] text-muted-foreground'>
                    Type
                </div>

                <div className='w-[15%] text-muted-foreground'>
                    Bowling
                </div>

                <div className='w-[15%] text-muted-foreground capitalize'>
                    Active
                </div>

                <div className='w-[10%]'>
                    Edit
                </div>
            </div>
            {playerData.length > 0 && playerData.map((player: any, index: number) => <Card key={index} className='mb-4'>
                <CardContent className='flex items-center px-4 py-2'>
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
                        {player.playerTeams.map(
                            (item: { teamId: string }) =>
                                <span className="shadow-sm border px-1 rounded-sm" key={item.teamId}>{item.teamId}</span>
                        )}
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

                    <div className='w-[15%] text-muted-foreground capitalize'>
                        <SwitchInactive
                            id={player.playerId}
                            checked={player?.playerTeams[0].active === 'yes' ? true : false}
                            handleChange={handleSwitchChange}
                        />
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
                                            defaultValue={!!player.playerType ? player.playerType : PlayerTypeConst[3]}
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
                                            defaultValue={!!player.bowlingType ? player.bowlingType : BowlingTypeConst[2]}
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

                                    <div className='mb-4'>
                                        <Select
                                            onValueChange={(selectedValue: string) => setValue('active', selectedValue)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Active?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">
                                                    Yes
                                                </SelectItem>
                                                <SelectItem value="no">
                                                    No
                                                </SelectItem>
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
