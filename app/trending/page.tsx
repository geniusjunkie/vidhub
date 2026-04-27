import { prisma } from '@/lib/prisma'
import PostCard from '@/components/PostCard'
import Sidebar from '@/components/Sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Trending' }

export default async function TrendingPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: [{ views: 'desc' }, { createdAt: 'desc' }],
    take: 20,
    include: {
      author: { select: { id: true, name: true, image: true } },
      tags: { include: { tag: true } },
      _count: { select: { votes: true, comments: true } },
    },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      <section>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Trending Articles</h1>
        <div className="space-y-4">
          {posts.map((post, i) => (
            <div key={post.id} className="flex gap-3 items-start">
              <span className="text-3xl font-black text-gray-100 w-8 shrink-0 leading-none mt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1"><PostCard post={post} /></div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="card p-10 text-center text-gray-400">No trending content yet.</div>
          )}
        </div>
      </section>
      <Sidebar />
    </div>
  )
}
