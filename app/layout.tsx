import getCurrentUser from '@/actions/getCurrentUser'
import ProvidersTanstack from '@/components/ProviderTanstack'
import Navbar from '@/components/navbar/Navbar'
import { SafeUser } from '@/types/SafeUser'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: 'Alm 6 by Arup D',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const currentUser: SafeUser | null = await getCurrentUser()

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <Navbar currentUser={currentUser} />
        <div className="px-2 py-2 lg:px-6 lg:py-8 md:px-12 lg:container lg:mx-auto">
          <ProvidersTanstack>
            {children}
          </ProvidersTanstack>
        </div>
      </body>
    </html>
  )
}
