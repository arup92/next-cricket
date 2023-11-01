'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CenteredArea from '../customUi/CenteredArea'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Teams } from "@/utils/Teams"

const formSchema = z.object({
    teamA: z.enum(Teams),
    teamB: z.enum(Teams),
    batFirst: z.enum(Teams),
    location: z.string().trim().min(3, 'Minimum 3 chars')
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
            location: ''
        },
        mode: 'onBlur',
        resolver: zodResolver(formSchema)
    })

    const [tabIndex, setTabIndex] = useState<string>("0")
    const [batFirstValues, setBatFirstValues] = useState({ teamA: '', teamB: '' })

    const handleChangeTab = (newTabIndex: string) => {
        setTabIndex(newTabIndex)
    }

    return (
        <CenteredArea maxWidthClass="max-w-xl">
            <Tabs value={tabIndex}>
                <TabsList>
                    <TabsTrigger onClick={() => handleChangeTab("0")} value={"0"}>Add Match</TabsTrigger>
                    <TabsTrigger onClick={() => handleChangeTab("1")} value={"1"}>Add Session A</TabsTrigger>
                    <TabsTrigger onClick={() => handleChangeTab("2")} value={"2"}>Add Session B</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit(values => {
                    alert(JSON.stringify(values, null, 2))
                })} >
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
                                            onValueChange={(selectedValue) => {
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
                                            onValueChange={(selectedValue) => {
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
                                            onValueChange={(selectedValue) => setValue('batFirst', selectedValue)}
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
                                            {...register('location')}
                                        />
                                        {errors.location && (
                                            <p className='text-red-500 inline-flex'>
                                                {errors.location.message}
                                            </p>
                                        )}
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