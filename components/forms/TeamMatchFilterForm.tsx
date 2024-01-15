import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { GoCheck, GoCode } from "react-icons/go"
import { z } from "zod"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { getVenues } from "@/utils/reactQuery"

const formSchema = z.object({
    opponent: z.string().optional(),
    matchFormat: z.string().optional(),
    venueId: z.string().trim().min(1, 'Enter valid details').optional(),
})

interface TeamMatchFilterFormProps {
    team: any
}

const TeamMatchFilterForm: React.FC<TeamMatchFilterFormProps> = ({ team }) => {
    const [open, setOpen] = useState(false)
    const [venueOpen, setVenueOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const router = useRouter()

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
        let opponent = !!values.opponent ? `/${values.opponent.toLowerCase()}` : `/all`
        let format = !!values.matchFormat ? `/${values.matchFormat}` : `/all`
        let venueId = !!values.venueId ? `/${values.venueId}` : ``

        router.push(`/view/team/${team.teamId.toLowerCase()}/${opponent}${format}${venueId}`)
        setDialogOpen(false)
    }

    // React Query
    const getCustomTeams = async (): Promise<any[]> => {
        return await axios.get(`/api/view/teams-get?teamType=${team.teamType}`)
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log(err)
                return []
            })
    }

    // React Query: Get all teams
    const { data: customTeams } = useQuery({
        queryKey: ['customTeams', team.teamType],
        queryFn: getCustomTeams,
        refetchOnWindowFocus: false,
    })

    // React Query: Get Venues
    const venues = useQuery({
        queryKey: ['allvenues'],
        queryFn: getVenues
    })

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Filter Format</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter by Match Format</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-3 space-y-3">
                    {team.teamType.toLowerCase() == 'national' && <div>
                        <Select
                            onValueChange={(selectedValue: string) => {
                                setValue('matchFormat', selectedValue)
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Match Format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All
                                </SelectItem>
                                <SelectItem value="odi">
                                    ODI
                                </SelectItem>
                                <SelectItem value="t20">
                                    T20I
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>}

                    <div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="justify-between w-full bg-white"
                                >
                                    {customTeams && watch().opponent ?
                                        watch().opponent.toUpperCase() : 'Opponent'
                                    }
                                    <span className="rotate-90"><GoCode /></span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" avoidCollisions={false} className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Match Format..." />
                                    <CommandEmpty>No Team Found.</CommandEmpty>
                                    <CommandGroup>
                                        {customTeams && customTeams.map((team: any) => (
                                            <CommandItem
                                                key={team.teamId}
                                                value={team.teamId}
                                                onSelect={(currentValue) => {
                                                    setValue('opponent', currentValue.toUpperCase())
                                                    setOpen(false)
                                                }}
                                            >
                                                {team.teamId}
                                                <span className={watch().opponent === team.teamId ? 'ml-auto opacity-100' : 'opacity-0'}>
                                                    <GoCheck />
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="mb-3">
                        <Popover open={venueOpen} onOpenChange={setVenueOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={venueOpen}
                                    className="justify-between w-full bg-white"
                                >
                                    {venues.data && watch().venueId ?
                                        venues.data.find((venue: any) => venue.venueId === watch().venueId)?.venueName :
                                        'Venue'
                                    }
                                    <span className="rotate-90"><GoCode /></span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" avoidCollisions={false} className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search venue..." />
                                    <CommandEmpty>No venue found.</CommandEmpty>
                                    <CommandGroup>
                                        {venues.data && venues.data.map((venue: any) => (
                                            <CommandItem
                                                key={venue.venueId}
                                                value={venue.venueId}
                                                onSelect={(currentValue) => {
                                                    setValue('venueId', currentValue)
                                                    setVenueOpen(false)
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

                    <DialogFooter>
                        <Button>Filter</Button>
                    </DialogFooter>
                </form>

                {errors.matchFormat && (
                    <p className="mb-5">{errors.matchFormat.message as any}</p>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default TeamMatchFilterForm
