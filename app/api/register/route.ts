import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import axios from "axios"
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { NextResponse } from "next/server"

interface RequestBody {
    name: string
    email: string
    password: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
    const verifyToken = crypto.randomBytes(32).toString('base64url')

    try {
        const user = await prismaClient.user.create({
            data: {
                name: body.name,
                email: body.email,
                hashedPassword: await bcrypt.hash(body.password, 12),
                verifyToken: verifyToken
            }
        })

        // Send verification email
        let data = {
            to: user.email,
            verifytoken: user.verifyToken,
            name: user.name
        }

        // Send the email
        await axios.post(`${process.env.APP_URL}/api/email/sendverifyemail`, data)

        const { hashedPassword, ...result } = user

        return NextResponse.json(result, { status: 201 })
    } catch (error: any) {
        if (error?.code === "P2002") {
            return NextResponse.json(ErrorMessage.EMAIL_EXISTS, { status: 400 })
        }

        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR + ' ' + error, { status: 500 })
    }
}