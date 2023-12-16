import { MatchFormat } from "@/types/MatchFormat"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { GoCheck, GoCode } from "react-icons/go"
import { z } from "zod"
import { Teams } from "@/types/Teams"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const formSchema = z.object({
    opponent: z.enum(Teams, {
        errorMap: () => ({
            message: 'Please select Opponent',
        }),
    }).nullable(),
    venueId: z.string().trim().min(3, 'Enter valid details').nullable()
})

const PlayerFilterForm = () => {
    const [open, setOpen] = useState(false)

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
        getValues,
        setValue,
        watch
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (values: any) => {
        console.log(values);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-3 justify-end">
                <div>
                    <Select
                        onValueChange={(selectedValue: string) => setValue('opponent', selectedValue === 'unassigned' ? null : selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={'Opponent'} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'unassigned'}>
                                Opponent
                            </SelectItem>
                            {Teams.map((team) => (
                                <SelectItem key={team} value={team}>
                                    {team}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[150px] justify-between bg-white"
                            >
                                {venues.data && !!watch().venueId ?
                                    venues.data.find((venue: any) => venue.venueId === watch().venueId)?.venueName :
                                    'Venue'
                                }
                                <span className="rotate-90"><GoCode /></span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[150px] p-0">
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

                <div>
                    <Select
                        onValueChange={(selectedValue: string) => setValue('country', selectedValue === 'unassigned' ? null : selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={'Country'} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'unassigned'}>
                                Country
                            </SelectItem>
                            {Teams.map((team) => (
                                <SelectItem key={team} value={team}>
                                    {team}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Select
                        onValueChange={(selectedValue: string) => setValue('innings', selectedValue === 'unassigned' ? null : selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={'Innings'} />
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

                <Button>Filter</Button>
            </form>

            {errors.opponent && (
                <p className="mb-5">{errors.opponent.message as any}</p>
            )}
            {errors.venueId && (
                <p className="mb-5">{errors.venueId.message as any}</p>
            )}
        </>
    )
}

export default PlayerFilterForm
