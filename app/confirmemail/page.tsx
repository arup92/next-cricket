import { Metadata } from "next"

export const metadata: Metadata = {
    title: `Conform your email | ${process.env.APP_NAME}`,
    description: 'Conform your email',
}

const ConfirmEmail = () => {
    return (
        <>
            <h1 className="text-center">Welcome. Please verfy your email<span className="ml-1 text-custom-extra">.</span></h1>
            <p className="text-center">We have sent an email to your registered emaill addres. Once verified you will be able to access your account.</p>
            <p className="text-sm text-center text-gray-500">If you don&apos;t see it, you may need to <span className="font-bold text-gray-800">check your spam</span> folder.</p>
        </>
    )
}

export default ConfirmEmail
