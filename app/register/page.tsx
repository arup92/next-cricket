import Anchor from "@/components/Anchor"
import RegisterForm from "@/components/forms/RegisterForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `Register | ${process.env.APP_NAME}`,
    description: 'Create an account',
}

const Register = () => {
    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mb-2 font-bold text-center">{process.env.APP_NAME}</h1>
                <h2 className="text-2xl font-bold leading-9 tracking-tight text-center">
                    Create account<span className="ml-1 text-custom-extra">.</span>
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <RegisterForm />
                <div className="mt-3 text-sm">
                    Already have an account? <Anchor linkTo="/login">Log in here.</Anchor>
                </div>
            </div>
        </div>
    )
}

export default Register
