import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import SessionProvider from '@/components/SessionProvider'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'VidHub — AI Video Creation', template: '%s | VidHub' },
  description: 'Create short-form videos with AI in seconds. Auto-clip, generate voiceovers, captions, and scripts — 4× faster.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider>
          {children}
          <Toaster position="bottom-right" toastOptions={{ style: { background: '#0a1628', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
        </SessionProvider>
      </body>
    </html>
  )
}
