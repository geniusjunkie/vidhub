'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const TOOLS = [
  { href: '/tools/script',        icon: '📝', label: 'Script Generator' },
  { href: '/tools/voiceover',     icon: '🎙️', label: 'Voiceover' },
  { href: '/tools/video-ranking', icon: '🏆', label: 'Video Ranking' },
  { href: '/tools/commentary',    icon: '🎬', label: 'Commentary' },
  { href: '/tools/ideas',         icon: '💡', label: 'Idea Generator' },
  { href: '/tools/image',         icon: '🖼️', label: 'Image Generator' },
  { href: '/tools/transcriber',   icon: '📄', label: 'Transcriber' },
  { href: '/tools/captions',      icon: '💬', label: 'Auto Captions' },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-dark-800 border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
          <span className="font-bold text-lg text-white">VidHub</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${path === '/dashboard' ? 'bg-brand-500/15 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Dashboard
        </Link>

        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-3 pt-4 pb-1">AI Tools</p>

        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${path === t.href ? 'bg-brand-500/15 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <span className="text-base">{t.icon}</span>
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1">
        <Link href="/pricing" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          ⚡ Upgrade plan
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  )
}
