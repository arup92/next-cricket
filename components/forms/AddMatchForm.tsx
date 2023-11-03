'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Teams } from "@/utils/Teams"
import { cn } from "@/utils/shadcnUtils"
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CenteredArea from '../customUi/CenteredArea'
import { Button } from '../ui/button'
import { Calendar } from "../ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import axios from "axios"

const formSchema = z.object({
    teamA: z.enum(Teams),
    teamB: z.enum(Teams),
    batFirst: z.enum(Teams),
    venue: z.string().trim().min(3, 'Minimum 3 chars'),
    venueCountry: z.enum(Teams),
    matchDate: z.date().refine((date) => new Date(date).toString() !== 'Invalid Date', {
        message: 'Date is not valid'
    }).transform((date) => format(date as Date, 'yyyy-MM-dd')),

    sessionAbat: z.string().trim().min(1, 'Enter valid details'),
    sessionAbowl: z.string().trim().min(1, 'Enter valid details'),
    sessionBbat: z.string().trim().min(1, 'Enter valid details'),
    sessionBbowl: z.string().trim().min(1, 'Enter valid details'),
})

const AddMatchForm = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            teamA: '',
            teamB: '',
            batFirst: '',
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
        axios.post('/api/add-match', values)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

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
                                                setValue('teamA', selectedValue)
                                                setBatFirstValues(prevState => ({ ...prevState, teamA: watch().teamA }))
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Team A" />
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

                                    <div>
                                        <Select
                                            onValueChange={(selectedValue: string) => {
                                                setValue('teamB', selectedValue)
                                                setBatFirstValues(prevState => ({ ...prevState, teamB: watch().teamB }))
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Team B" />
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
                                        <Input
                                            type='text'
                                            className='min-w-full'
                                            placeholder='Venue'
                                            {...register('venue')}
                                        />
                                        {errors.venue && (
                                            <p className='text-red-500 inline-flex'>
                                                {errors.venue.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Select
                                            onValueChange={(selectedValue: string) => setValue('venueCountry', selectedValue)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Venue Country" />
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
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
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


                            <CardFooter>
                                <Button>Submit</Button>
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

                            <CardFooter>
                                <Button>Submit</Button>
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

                            <CardFooter>
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