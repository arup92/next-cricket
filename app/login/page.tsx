import Anchor from '@/components/Anchor'
import LoginForm from '@/components/forms/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: `Login | ${process.env.APP_NAME}`,
    description: 'Login to your account',
}

const Login = () => {
    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mb-2 font-bold text-center">{process.env.APP_NAME}</h1>
                <h2 className="text-2xl font-bold leading-9 tracking-tight text-center">
                    Sign in to your account<span className="ml-1 text-custom-extra">.</span>
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />
                <div className="mt-3 text-sm">
                    Don&apos;t yet have an account? <Anchor linkTo="/register">Create one here.</Anchor>
                </div>
            </div>
        </div>
    )
}

export default Login
