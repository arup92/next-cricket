import { BowlingTypeConst } from '@/types/BowlingDataType';
import { PlayerTypeConst } from '@/types/Player';
import { getFullNameByCode } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TbEdit } from "react-icons/tb";
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ListPlayersEditProps {
    playerData: any[]
}

const formSchema = z.object({
    description: z.string().trim().optional(),
    playerType: z.enum(PlayerTypeConst).optional(),
    bowlingType: z.enum(BowlingTypeConst).optional(),
})

const ListPlayersEdit: React.FC<ListPlayersEditProps> = ({ playerData }) => {
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
                        {player.playerName}
                    </div>

                    <div className='w-[25%] text-muted-foreground'>
                        {getFullNameByCode(player.playerCountryId)}
                    </div>

                    <div className='w-[25%] text-muted-foreground'>
                        {player.playerType ? player.playerType : (
                            <span className='text-sm'>N/A</span>
                        )}
                    </div>

                    <div className='w-[15%] text-muted-foreground'>
                        {player.bowlingType ? player.bowlingType : (
                            <span className='text-sm'>N/A</span>
                        )}
                    </div>

                    <div className='w-[10%]'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline"><TbEdit /></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='mb-3'>{player.playerName}</DialogTitle>
                                </DialogHeader>
                                <form>
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
