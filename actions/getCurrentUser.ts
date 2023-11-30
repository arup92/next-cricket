import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import client from '../libs/prismadb'

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
        const session = await getSession()
        if (!session?.user?.email) return null

        const currentUser = await client.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) return null

        const { hashedPassword, updatedAt, verifyToken, loginId, ...returnData } = currentUser

        return returnData

    } catch (error) {
        return null
    }
}