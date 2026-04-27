import { prisma } from '@/lib/prisma'
import PostCard from '@/components/PostCard'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Articles' }

export default async function PostsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, Number(searchParams.page ?? 1))
  const limit = 15

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, name: true, image: true } },
        tags: { include: { tag: true } },
        _count: { select: { votes: true, comments: true } },
      },
    }),
    prisma.post.count({ where: { published: true } }),
  ])

  const pages = Math.ceil(total / limit)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          <Link href="/posts/new" className="btn-primary">Write Article</Link>
        </div>

        <div className="space-y-4">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
          {posts.length === 0 && (
            <div className="card p-10 text-center text-gray-400">No articles yet.</div>
          )}
        </div>

        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/posts?page=${p}`}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === page ? 'bg-brand-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </section>
      <Sidebar />
    </div>
  )
}
