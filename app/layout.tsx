import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import getCurrentUser from '@/actions/getCurrentUser'
import { Toaster } from 'react-hot-toast'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: 'Alm 6 by Arup D',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <Navbar currentUser={currentUser} />
        <div className="px-6 py-8 md:px-12 lg:container lg:mx-auto lg:px-6">
          {children}
        </div>
      </body>
    </html>
  )
}
