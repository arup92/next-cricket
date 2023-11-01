import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { generateRandomHash } from "@/utils/utils"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import axios from "axios"
import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error(ErrorMessage.INV_CREDENTIALS)
                }

                const user = await prismaClient.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error(ErrorMessage.INV_CREDENTIALS)
                } else if (!user.isActive) {

                    // Send verification email
                    let data = {
                        to: user.email,
                        verifytoken: user.verifyToken,
                        name: user.name
                    }

                    // Send the email
                    await axios.post(`${process.env.APP_URL}/api/email/sendverifyemail`, data)
                    // Finally throw the error
                    throw Error(ErrorMessage.EMAIL_NOT_ACTIVE)
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!isCorrectPassword) {
                    throw new Error(ErrorMessage.INV_CREDENTIALS)
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isActive: user.isActive
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60 // 1 day = 24 hours * 60 minutes * 60 seconds
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 7 * 24 * 60 * 60 // 1 day = 24 hours * 60 minutes * 60 seconds
    },
    events: {
        async signOut({ token }) {

            // unset the loginid
            await prismaClient.user.update({
                where: {
                    email: token.email || ''
                },
                data: {
                    loginId: null
                }
            })
        }
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                let loginId = generateRandomHash(16)

                // Add new login id
                await prismaClient.user.update({
                    where: {
                        email: token.email as string
                    },
                    data: {
                        loginId: loginId
                    }
                })

                return { ...token, loginId }
            }

            return token
        }
    }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
