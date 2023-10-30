import { getServerSession } from 'next-auth/next'
import client from '../libs/prismadb'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

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

        const { hashedPassword, updatedAt, ...returnData } = currentUser

        return returnData
    } catch (error) {
        return null
    }
}