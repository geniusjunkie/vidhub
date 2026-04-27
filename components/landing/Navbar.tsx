'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-dark-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
          <span className="font-bold text-xl text-white">VidHub</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm">
          <Link href="/#features" className="btn-ghost">Features</Link>
          <Link href="/pricing" className="btn-ghost">Pricing</Link>
          <Link href="/#reviews" className="btn-ghost">Reviews</Link>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link href="/dashboard" className="btn-ghost">Dashboard</Link>
              <button onClick={() => signOut()} className="btn-secondary text-sm px-4 py-2">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost">Login</Link>
              <Link href="/register" className="btn-primary text-sm px-4 py-2">Try VidHub</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
