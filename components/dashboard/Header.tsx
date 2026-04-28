'use client'
import { useSession } from 'next-auth/react'
import { getAvatarUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header({ title }: { title: string }) {
  const { data: session } = useSession()
  const [credits, setCredits] = useState<number | null>(null)
  const [plan, setPlan] = useState<string>('FREE')

  useEffect(() => {
    fetch('/api/user/me')
      .then(r => r.json())
      .then(d => { if (d.credits !== undefined) { setCredits(d.credits); setPlan(d.plan) } })
      .catch(() => {})
  }, [])

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6">
      <h1 className="font-bold text-white text-lg">{title}</h1>
      <div className="flex items-center gap-4">
        {credits !== null && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-700 border border-white/10">
            <span className="text-yellow-400 text-sm">⚡</span>
            <span className="text-sm font-semibold text-white">{credits}</span>
            <span className="text-xs text-gray-500">credits</span>
          </div>
        )}
        <Link href="/pricing">
          <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold capitalize">
            {plan}
          </span>
        </Link>
        <Image
          src={getAvatarUrl(session?.user?.name, session?.user?.image)}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full ring-2 ring-white/10"
        />
      </div>
    </header>
  )
}
