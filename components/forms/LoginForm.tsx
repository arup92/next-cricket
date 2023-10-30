'use client'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Anchor from "../Anchor"
import Button from "../Button"
import Input from "../Input"

const LoginForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        signIn(
            'credentials',
            {
                ...data,
                redirect: false,
            }
        ).then((callback) => {
            setIsLoading(false)
            if (!!callback?.error) {
                toast.error(callback.error)
            } else if (callback?.ok) {
                router.refresh()
                router.push("/dashboard/userpost")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">
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
                    <div className="text-sm">
                        <Anchor linkTo="#">Forgot password?</Anchor>
                    </div>
                </div>
                <div className="mt-2">
                    <Input id="password" type='password' name="password" />
                </div>
            </div>

            <div>
                <Button
                    isLoading={isLoading}
                >
                    Log in
                </Button>
            </div>
        </form>
    )
}

export default LoginForm
