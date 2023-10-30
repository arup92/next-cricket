'use client'
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import Anchor from "../Anchor"
import Button from "../Button"
import Input from "../Input"
import axios from "axios"
import toast from "react-hot-toast"
import { ErrorMessage, Message } from "@/responses/messages"

const RegisterForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        axios.post(`/api/register`, data)
            .then((response: any) => {
                setIsLoading(false)
                if (response.data.id) {
                    toast.success(Message.SUCCESS_REGISTERED)
                    router.push('/confirmemail')
                } else {
                    toast.error(ErrorMessage.INT_SERVER_ERROR)
                }
            }).catch((error) => {
                setIsLoading(false)
                toast.error(error.response.data)
            })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
                <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                </label>
                <div className="mt-1">
                    <Input id="full-name" type='text' name="name" />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-1">
                    <Input id="email" type='text' name="email" />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                </div>
                <div className="mt-2">
                    <Input id="password" type='password' name="password" />
                </div>
            </div>

            <div>
                <Button
                    isLoading={isLoading}
                >
                    Sign Up
                </Button>
            </div>
        </form>
    )
}

export default RegisterForm
