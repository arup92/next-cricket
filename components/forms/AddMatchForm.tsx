'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ErrorMessage } from "@/responses/messages"
import { MatchFormat, MatchType } from "@/types/MatchFormat"
import { cn } from "@/utils/shadcnUtils"
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast"
import { GoCheck, GoCode } from "react-icons/go"
import { z } from 'zod'
import CenteredArea from '../customUi/CenteredArea'
import { Button } from '../ui/button'
import { Calendar } from "../ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import Link from "next/link"

const formSchema = z.object({
    matchType: z.enum(MatchType),
    matchFormat: z.enum(MatchFormat),
    teamA: z.string().min(2),
    teamB: z.string().min(2),
    batFirst: z.string().min(2),
    result: z.string().optional(),
    venue: z.string().trim().min(3, 'Minimum 3 chars'),
    venueCountry: z.string().min(2).optional(),
    matchDate: z.date().refine((date) => new Date(date).toString() !== 'Invalid Date', {
        message: 'Date is not valid'
    }).transform((date) => format(date as Date, 'yyyy-MM-dd')),

    sessionAbat: z.string().trim().min(1, 'Enter valid details'),
    sessionAbowl: z.string().trim().min(1, 'Enter valid details'),

    sessionBbat: z.string().trim().min(1, 'Enter valid details'),
    sessionBbowl: z.string().trim().min(1, 'Enter valid details'),
})

const AddMatchForm = () => {
    const [tAOpen, setTAOpen] = useState(false)
    const [tBOpen, setTBOpen] = useState(false)
    const [venueCOpen, setVenueCOpen] = useState(false)

    const router = useRouter()

    const {
        formState: { errors },
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            matchType: 'MEN',
            matchFormat: '',
            teamA: '',
            teamB: '',
            batFirst: '',
            result: '',
            venue: '',
            venueCountry: '',
            matchDate: new Date(),

            sessionAbat: '',
            sessionAbowl: '',

            sessionBbat: '',
            sessionBbowl: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(formSchema)
    })

    const [tabIndex, setTabIndex] = useState<string>("0")
    const [batFirstValues, setBatFirstValues] = useState({ teamA: '', teamB: '' })

    const handleChangeTab = (newTabIndex: string) => {
        setTabIndex(newTabIndex)
    }

    const onSubmit = (values: any) => {
        axios.post('/api/dashboard/add-match', values)
            .then(response => {
                if (response.status === 200) {
                    toast.success(`${response.data.message}! ${<Link target="_blank" href={`${process.env.NEXT_PUBLIC_APP_URL}/view/match?matchId=${response.data.matchId}`}>View Match</Link>}`)
                    // router.push(`${process.env.NEXT_PUBLIC_APP_URL}/view/match?matchId=${response.data.matchId}`)
                } else {
                    toast.error(ErrorMessage.SOMETHING_WRONG)
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    toast.error(error.response.data)
                } else {
                    console.log(error)
                    toast.error(ErrorMessage.SOMETHING_WRONG)
                }
            })
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

    // React Query: Get Countries
    const getCountries = async () => {
        return await axios.get(`/api/view/teams-get?countries=true`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
                return []
            })
    }

    const { data: Countries } = useQuery({
        queryKey: ['countries'],
        queryFn: getCountries
    })

    return (
        <CenteredArea maxWidthClass="max-w-xl">
            <Tabs value={tabIndex}>
                <TabsList>
                    <TabsTrigger onClick={() => handleChangeTab("0")} value={"0"}>Add Match</TabsTrigger>
                    <TabsTrigger onClick={() => handleChangeTab("1")} value={"1"}>Add Session A</TabsTrigger>
                    <TabsTrigger onClick={() => handleChangeTab("2")} value={"2"}>Add Session B</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <TabsContent value={"0"}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <Select
                                            onValueChange={(selectedValue: string) => {
                                                setValue('matchType', selectedValue)
                                            }}
                                            value={getValues('matchType')}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Match Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {MatchType.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Select
                                            onValueChange={(selectedValue: string) => {
                                                setValue('matchFormat', selectedValue)
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Match Format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {MatchFormat.map((format) => (
                                                    <SelectItem key={format} value={format}>
                                                        {format}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Popover open={tAOpen} onOpenChange={setTAOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={tAOpen}
                                                    className="w-full justify-between bg-white"
                                                >
                                                    {Teams && watch().teamA ?
                                                        Teams.find((team: any) => team.teamId === watch().teamA.toUpperCase()).teamId :
                                                        'Team A'
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
                                                                    setValue('teamA', currentValue.toUpperCase())
                                                                    setBatFirstValues(prevState => ({ ...prevState, teamA: watch().teamA }))
                                                                    setTAOpen(false)
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

                                    <div>
                                        <Popover open={tBOpen} onOpenChange={setTBOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={tBOpen}
                                                    className="w-full justify-between bg-white"
                                                >
                                                    {Teams && watch().teamB ?
                                                        Teams.find((team: any) => team.teamId === watch().teamB.toUpperCase()).teamId :
                                                        'Team B'
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
                                                                    setValue('teamB', currentValue.toUpperCase())
                                                                    setBatFirstValues(prevState => ({ ...prevState, teamB: watch().teamB }))
                                                                    setTBOpen(false)
                                                                }}
                                                            >
                                                                {team.teamId}
                                                                <span className={watch().teamB === team.teamId ? 'ml-auto opacity-100' : 'opacity-0'}>
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
                                            onValueChange={(selectedValue: string) => setValue('batFirst', selectedValue)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Bat First" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {batFirstValues.teamA && <SelectItem key={batFirstValues.teamA} value={batFirstValues.teamA}>
                                                    {batFirstValues.teamA}
                                                </SelectItem>}

                                                {batFirstValues.teamB && <SelectItem key={batFirstValues.teamB} value={batFirstValues.teamB}>
                                                    {batFirstValues.teamB}
                                                </SelectItem>}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Select
                                            onValueChange={(selectedValue: string) => setValue('result', selectedValue)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Result" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {batFirstValues.teamA && <SelectItem key={batFirstValues.teamA} value={batFirstValues.teamA}>
                                                    {batFirstValues.teamA}
                                                </SelectItem>}

                                                {batFirstValues.teamB && <SelectItem key={batFirstValues.teamB} value={batFirstValues.teamB}>
                                                    {batFirstValues.teamB}
                                                </SelectItem>}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Input
                                            type='text'
                                            className='min-w-full'
                                            placeholder='Venue'
                                            {...register('venue')}
                                        />
                                        {errors.venue && (
                                            <p className='inline-flex text-red-500'>
                                                {errors.venue.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Popover open={venueCOpen} onOpenChange={setVenueCOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={venueCOpen}
                                                    className="w-full justify-between bg-white"
                                                >
                                                    {Countries && watch().venueCountry ?
                                                        Countries.find((country: any) => country.teamId === watch().venueCountry.toUpperCase()).teamId :
                                                        'Venue Country'
                                                    }
                                                    <span className="rotate-90"><GoCode /></span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent side="bottom" avoidCollisions={false} className="w-full p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search Venue Country..." />
                                                    <CommandEmpty>No Team Found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {Countries && Countries.map((country: any) => (
                                                            <CommandItem
                                                                key={country.teamId}
                                                                value={country.teamId}
                                                                onSelect={(currentValue) => {
                                                                    setValue('venueCountry', currentValue.toUpperCase())
                                                                    setVenueCOpen(false)
                                                                }}
                                                            >
                                                                {country.teamId}
                                                                <span className={watch().teamB === country.teamId ? 'ml-auto opacity-100' : 'opacity-0'}>
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
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] justify-start text-left font-normal min-w-full",
                                                        !watch().matchDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                                    {watch().matchDate ? format(watch().matchDate as any, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={watch().matchDate as Date}
                                                    onSelect={(selectedValue: Date | undefined) => {
                                                        setValue('matchDate', selectedValue as Date)
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </CardContent>


                            <CardFooter className="flex justify-end">
                                <Button onClick={() => handleChangeTab("1")}>Next</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value={"1"}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <Textarea
                                            rows={8}
                                            placeholder="Enter Session A Batting Details Followed by New Lines.."
                                            {...register('sessionAbat')}
                                        />
                                    </div>


                                    <div>
                                        <Textarea
                                            rows={8}
                                            placeholder="Enter Session A Bowling Details Followed by New Lines.."
                                            {...register('sessionAbowl')}
                                        />
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-between">
                                <Button onClick={() => handleChangeTab("0")}>Back</Button>
                                <Button onClick={() => handleChangeTab("2")}>Next</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value={"2"}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <Textarea
                                            rows={8}
                                            placeholder="Enter Session B Batting Details Followed by New Lines.."
                                            {...register('sessionBbat')}
                                        />
                                    </div>

                                    <div>
                                        <Textarea
                                            rows={8}
                                            placeholder="Enter Session B Bowling Details Followed by New Lines.."
                                            {...register('sessionBbowl')}
                                        />
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-between">
                                <Button onClick={() => handleChangeTab("1")}>Back</Button>
                                <Button>Submit</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                </form>
            </Tabs>
        </CenteredArea>
    )
}

export default AddMatchForm