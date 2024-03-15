import ProvidersTanstack from '@/components/ProviderTanstack'
import Providers from '@/components/Providers'
import SticketyPlus from '@/components/SticketyPlus'
import Footer from '@/components/Footer'
import Navbar from '@/components/navbar/Navbar'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: process.env.APP_NAME,
	description: 'Fantasy Cricket Statistics',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${nunito.className} bg-gray-50 relative`}>
				<Toaster />
				<Providers>
					<ProvidersTanstack>
						<Navbar />
						<div className="px-2 py-2 lg:px-6 lg:py-8 md:px-12 lg:container lg:mx-auto min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-148px)]">
							{children}
						</div>

						<Footer />
						<SticketyPlus />
					</ProvidersTanstack>
				</Providers>
			</body>
		</html>
	)
}
