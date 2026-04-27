import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import PostCard from '@/components/PostCard'
import QuestionCard from '@/components/QuestionCard'
import Sidebar from '@/components/Sidebar'

async function getHomeData(tab: string) {
  const orderBy = tab === 'trending'
    ? [{ views: 'desc' as const }, { createdAt: 'desc' as const }]
    : [{ createdAt: 'desc' as const }]

  const posts = await prisma.post.findMany({
    where: { published: true },
    take: 10,
    orderBy,
    include: {
      author: { select: { id: true, name: true, image: true } },
      tags: { include: { tag: true } },
      _count: { select: { votes: true, comments: true } },
    },
  })
  return posts
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { tab?: string }
}) {
  const tab = searchParams.tab ?? 'newest'
  const posts = await getHomeData(tab)

  const tabs = [
    { key: 'newest', label: 'Newest' },
    { key: 'trending', label: 'Trending' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      {/* Main feed */}
      <section>
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to VidHub</h1>
          <p className="text-brand-100 mb-5 max-w-lg">
            The community for tech enthusiasts. Read, write, and connect with developers around the world.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/posts/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-700 font-semibold text-sm hover:bg-brand-50 transition-colors">
              Write Article
            </Link>
            <Link href="/questions/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500/40 text-white font-semibold text-sm hover:bg-brand-500/60 transition-colors border border-brand-400/40">
              Ask Question
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-5 border-b border-gray-200 pb-0">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={`/?tab=${t.key}`}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === t.key
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {posts.length === 0 && (
            <div className="card p-10 text-center">
              <p className="text-gray-400 mb-3">No articles yet. Be the first to write!</p>
              <Link href="/posts/new" className="btn-primary">Write Article</Link>
            </div>
          )}
        </div>
      </section>

      {/* Sidebar */}
      <Sidebar />
    </div>
  )
}
