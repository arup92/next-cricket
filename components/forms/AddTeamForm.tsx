'use client'

import { addTeamSchema } from "@/utils/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import CenteredArea from "../customUi/CenteredArea"
import axios from "axios"
import toast from "react-hot-toast"

const AddTeamForm = () => {
    const {
        formState: { errors },
        reset,
        register,
        handleSubmit
    } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(addTeamSchema)
    })

    const onSubmit = async (values: any) => {
        console.log(values);
        await axios.post('/api/dashboard/add-team', values)
            .then(response => toast.success(response.data))
            .catch(error => toast.error(error.response.data))
    }

    return (
        <CenteredArea maxWidthClass="max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                    <Input
                        type='text'
                        className='min-w-full'
                        placeholder='Team ID'
                        {...register('teamId')}
                    />
                    {errors.teamId && (
                        <p className='inline-flex text-red-500'>
                            {errors.teamId.message as any}
                        </p>
                    )}
                </div>

                <div>
                    <Input
                        type='text'
                        className='min-w-full'
                        placeholder='Team Name'
                        {...register('teamName')}
                    />
                    {errors.teamName && (
                        <p className='inline-flex text-red-500'>
                            {errors.teamName.message as any}
                        </p>
                    )}
                </div>

                <div>
                    <Input
                        type='text'
                        className='min-w-full'
                        placeholder='Team Type'
                        {...register('teamType')}
                    />
                    {errors.teamType && (
                        <p className='inline-flex text-red-500'>
                            {errors.teamType.message as any}
                        </p>
                    )}
                </div>

                <div className="w-full text-center">
                    <Button>Submit</Button>
                </div>
            </form>
        </CenteredArea>
    )
}

export default AddTeamForm