import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { GoCheck, GoCode } from "react-icons/go"
import { z } from "zod"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const formSchema = z.object({
    opponent: z.string().min(2).nullable().optional(),
    host: z.string().min(2).nullable().optional(),
    venueId: z.string().trim().min(3, 'Enter valid details').nullable().optional(),
    innings: z.string().trim().min(3, 'Enter valid details').max(3, 'Enter valid details').nullable().optional()
})

interface PlayerFilterFormProps {
    playerData: any
    handleData: (item: any) => void
}

const PlayerFilterForm: React.FC<PlayerFilterFormProps> = ({ playerData, handleData }) => {
    const [opOpen, setOpOpen] = useState(false)
    const [hoOpen, setHoOpen] = useState(false)

    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [searchData, setSearchData] = useState<string>('')

    // Get Venues
    const getVenues = async (): Promise<any> => {
        return await axios.get(`/api/view/venues-get`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
                return []
            })
    }

    const venues = useQuery({
        queryKey: ['allvenues'],
        queryFn: getVenues
    })

    // Hook Form
    const {
        formState: { errors },
        handleSubmit,
        setValue,
        watch
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: any) => {
        values.playerId = playerData.playerId
        values.teamId = playerData.playerTeams.map((team: { teamId: string }) => team.teamId)
        const searchParams = new URLSearchParams(values).toString()

        if (searchData !== searchParams) {
            setLoading(true)
            setSearchData(searchParams)
            await axios.get(`/api/view/player-get?${searchParams}`)
                .then((response) => {
                    handleData(response.data)
                    setLoading(false)
                    setDialogOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                    setDialogOpen(false)
                })
        }
    }

    // React Query: Get Teams
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
        queryKey: ['teams'],
        queryFn: getTeams
    })

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Filter Data</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter Player Statistics</DialogTitle>
                    <DialogDescription>
                        View detailed statistics. (Only the recent stats are shown)
                        <br />
                        <span className="text-emerald-700 font-bold">All Fields are Optional!</span>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-3 space-y-3">
                    <div>
                        <Popover open={opOpen} onOpenChange={setOpOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={opOpen}
                                    className="w-full justify-between bg-white"
                                >
                                    {Teams && watch().opponent ?
                                        Teams.find((team: any) => team.teamId === watch().opponent.toUpperCase()).teamId :
                                        'Opponent'
                                    }
                                    <span className="rotate-90"><GoCode /></span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Opponent Team..." />
                                    <CommandEmpty>No Team Found.</CommandEmpty>
                                    <CommandGroup>
                                        {Teams && Teams.map((team: any) => (
                                            <CommandItem
                                                key={team.teamId}
                                                value={team.teamId}
                                                onSelect={(currentValue) => {
                                                    setValue('opponent', currentValue.toUpperCase())
                                                    setOpOpen(false)
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

                    <div className="flex gap-3 justify-between">
                        <div className="w-[50%]">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between bg-white"
                                    >
                                        {venues.data && !!watch().venueId ?
                                            venues.data.find((venue: any) => venue.venueId === watch().venueId)?.venueName :
                                            'Venue'
                                        }
                                        <span className="rotate-90"><GoCode /></span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent side="left" className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search venue..." />
                                        <CommandEmpty>No venue found.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem
                                                value={'unassigned'}
                                                onSelect={() => {
                                                    setValue('venueId', null)
                                                    setOpen(false)
                                                }}
                                            >
                                                Venue
                                                <span className={watch().venueId === null ? 'ml-auto opacity-100' : 'opacity-0'}>
                                                    <GoCheck />
                                                </span>
                                            </CommandItem>
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

                        <div className="w-[50%]">
                            <Popover open={hoOpen} onOpenChange={setHoOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={hoOpen}
                                        className="w-full justify-between bg-white"
                                    >
                                        {Teams && watch().host ?
                                            Teams.find((team: any) => team.teamId === watch().host.toUpperCase()).teamId :
                                            'Hosting Country'
                                        }
                                        <span className="rotate-90"><GoCode /></span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent side="right" className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Hosting Country..." />
                                        <CommandEmpty>No Team Found.</CommandEmpty>
                                        <CommandGroup>
                                            {Teams && Teams.map((team: any) => (
                                                <CommandItem
                                                    key={team.teamId}
                                                    value={team.teamId}
                                                    onSelect={(currentValue) => {
                                                        setValue('host', currentValue.toUpperCase())
                                                        setHoOpen(false)
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
                    </div>

                    <div>
                        <Select
                            onValueChange={(selectedValue: string) => setValue('innings', selectedValue === 'unassigned' ? null : selectedValue)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={!watch().innings ? 'Innings' : watch().innings} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'unassigned'}>
                                    Innings
                                </SelectItem>
                                <SelectItem value='1st'>
                                    1st
                                </SelectItem>
                                <SelectItem value='2nd'>
                                    2nd
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button>
                            {loading ? <>
                                <svg className="absolute animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> <span className="opacity-0 invisible">Filter</span>
                            </> : 'Filter'}
                        </Button>
                    </DialogFooter>
                </form>

                {errors.opponent && (
                    <p className="mb-5">{errors.opponent.message as any}</p>
                )}
                {errors.venueId && (
                    <p className="mb-5">{errors.venueId.message as any}</p>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default PlayerFilterForm
