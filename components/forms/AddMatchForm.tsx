'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "../ui/input"
import { useForm } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '../ui/button'
import { useState } from 'react'

const formSchema = z.object({
    firstName: z.string().min(4, 'min 4 chars').max(8, 'max 8 chars'),
    lastName: z.string().min(4, 'min 4 chars').max(8, 'max 8 chars'),
    email: z.string().email(),
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
            firstName: '',
            lastName: '',
            email: '',
        },
        mode: 'all',
        resolver: zodResolver(formSchema)
    })

    const [tabIndex, setTabIndex] = useState<string>("0");

    const handleChangeTab = (newTabIndex: string) => {
        setTabIndex(newTabIndex);
    }

    return (
        <>
            <form onSubmit={handleSubmit(values => {
                alert(JSON.stringify(values, null, 2))
            })} >
                <Input
                    type='text'
                    className='min-w-full'
                    placeholder='First name'
                    {...register('firstName')}
                />
                {errors.firstName && (
                    <p className='text-red-500 inline-flex'>
                        {errors.firstName.message}
                    </p>
                )}
            </form>

            <Tabs value={tabIndex}>
                <TabsList>
                    <TabsTrigger onClick={() => handleChangeTab("0")} value={"0"}>Tab 1</TabsTrigger>
                    <TabsTrigger onClick={() => handleChangeTab("1")} value={"1"}>Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value={"0"}>
                    <button onClick={() => handleChangeTab("1")}>Change to Tab 2</button>
                </TabsContent>
                <TabsContent value={"1"}>Tab 2 content</TabsContent>
            </Tabs>

        </>
    )
}

export default AddMatchForm