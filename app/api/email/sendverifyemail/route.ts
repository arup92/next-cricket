import { ErrorMessage, Message } from "@/responses/messages";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

interface RequestBody {
    to: string
    verifytoken: string
    name: string
}

export async function POST(request: Request) {
    const { to: sendTo, verifytoken, name }: RequestBody = await request.json()
    const verifyUrl = `${process.env.APP_URL}/emailverify?verifytoken=${verifytoken}`

    const message = {
        from: `${process.env.APP_NAME}<${process.env.NODEMAILER_EMAIL}>`,
        to: sendTo,
        subject: "Activate your account!",
        text: `Hello ${name}, Please click on the following link to verify your email address: ${verifyUrl}`,
        html: `<p>Hello ${name},<br>Please click on the following link to verify your email address: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW,
        },
    })

    try {
        await transporter.sendMail(message)
        return NextResponse.json(Message.SUCESS_EMAIL_SENT, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}