import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Header from '@/components/dashboard/Header'
import Link from 'next/link'
import { PLANS } from '@/lib/stripe'

const TOOLS = [
  { href: '/tools/script',        icon: '📝', label: 'Script Generator',  desc: 'Generate viral scripts instantly' },
  { href: '/tools/voiceover',     icon: '🎙️', label: 'Voiceover',         desc: '35+ AI voices, studio quality' },
  { href: '/tools/video-ranking', icon: '🏆', label: 'Video Ranking',     desc: 'Build comparison-style videos' },
  { href: '/tools/commentary',    icon: '🎬', label: 'Commentary',        desc: 'Scripts into video scenes' },
  { href: '/tools/ideas',         icon: '💡', label: 'Idea Generator',    desc: 'Never run out of content' },
  { href: '/tools/image',         icon: '🖼️', label: 'Image Generator',   desc: 'AI thumbnails & visuals' },
  { href: '/tools/transcriber',   icon: '📄', label: 'Transcriber',       desc: 'Video to text in minutes' },
  { href: '/tools/captions',      icon: '💬', label: 'Auto Captions',     desc: 'Styled captions, auto-synced' },
]

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const user = await prisma.user.findUnique({
    where: { id: (session!.user as any).id },
    include: { projects: { orderBy: { createdAt: 'desc' }, take: 5 } },
  })

  const plan = PLANS[user?.plan ?? 'FREE']

  return (
    <div className="flex flex-col flex-1">
      <Header title="Dashboard" />
      <div className="flex-1 p-6 space-y-8">

        {/* Welcome */}
        <div className="card-dark p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Welcome back, {user?.name?.split(' ')[0]} 👋</h2>
            <p className="text-gray-400 text-sm">You have <span className="text-brand-400 font-semibold">{user?.credits} credits</span> remaining on your <span className="capitalize font-semibold text-white">{user?.plan}</span> plan.</p>
          </div>
          {user?.plan === 'FREE' && (
            <Link href="/pricing" className="btn-primary">⚡ Upgrade plan</Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Credits remaining', value: user?.credits ?? 0, icon: '⚡' },
            { label: 'Projects created', value: user?.projects.length ?? 0, icon: '🎬' },
            { label: 'Monthly videos', value: plan.videos, icon: '📤' },
          ].map((s) => (
            <div key={s.label} className="card-dark p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-white font-bold mb-4">AI Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className="card-dark p-4 hover:border-brand-500/30 transition-colors group">
                <div className="text-2xl mb-3">{t.icon}</div>
                <div className="font-semibold text-white text-sm group-hover:text-brand-400 transition-colors">{t.label}</div>
                <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent projects */}
        {user?.projects && user.projects.length > 0 && (
          <div>
            <h3 className="text-white font-bold mb-4">Recent Projects</h3>
            <div className="card-dark divide-y divide-white/5">
              {user.projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">{p.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{p.tool.toLowerCase().replace('_', ' ')} · {p.status.toLowerCase()}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'COMPLETE' ? 'bg-green-500/10 text-green-400' : p.status === 'PROCESSING' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
