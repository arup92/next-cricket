import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentSession() {
    try {
        const session = await getSession()

        if (!session?.user?.email) return null

        return session.user?.email
    } catch (error) {
        return null
    }
}