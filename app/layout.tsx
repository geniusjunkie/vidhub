import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: { default: 'VidHub', template: '%s | VidHub' },
  description: 'A community platform for tech enthusiasts — share articles, ask questions, and grow together.',
  icons: { icon: '/favicon.ico' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  )
}
