'use client'

import { ErrorMessage } from '@/responses/messages'
import axios from 'axios'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from 'react'

const EmailVerify = () => {
    const searchParams = useSearchParams()
    const verifyToken = searchParams.get("verifytoken")

    const [isVerified, setIsVerified] = useState(false)
    const [response, setResponse] = useState("")

    useEffect(() => {
        axios.get(`/api/email/verify/${verifyToken}`)
            .then(result => {
                console.log(result)
                if (result.status === 200) {
                    setIsVerified(true)
                    setResponse(result.data)
                } else {
                    setIsVerified(false)
                    setResponse(ErrorMessage.INT_SERVER_ERROR)
                }
            })
            .catch(error => {
                setIsVerified(false)
                setResponse(error.response.data)
            })
    }, [verifyToken])

    return (
        <>
            <h1>Email Verificaiton</h1>
            <p
                className={`
                    font-semibold
                    ${isVerified ? 'text-emerald-500' : 'text-rose-500'}
                `}>{response}
            </p>
        </>
    )
}

export default EmailVerify
