import { ErrorMessage, Message } from "@/responses/messages"
import prismaClient from "@/libs/prismadb"
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client";

export async function GET(request: Request, { params }: { params: { verifytoken: string } }) {
    const verifyToken: string = params.verifytoken

    if (verifyToken.length < 32) {
        return new NextResponse(ErrorMessage.INV_EMAIL_VERIFY_TOKEN, { status: 400 })
    }

    try {
        const updateIsActive = await prismaClient.user.update({
            where: {
                verifyToken: verifyToken
            },
            data: {
                isActive: true,
                verifyToken: ""
            }
        })
        if (updateIsActive.isActive) {
            return NextResponse.json(Message.SUCESS_EMAIL_VERIFIED, { status: 200 })
        }

        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return new NextResponse(ErrorMessage.INV_EMAIL_VERIFY_TOKEN, { status: 400 })
            }
        }

        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }

}