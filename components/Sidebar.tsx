import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function Sidebar() {
  const [tags, topAuthors] = await Promise.all([
    prisma.tag.findMany({
      take: 10,
      include: { _count: { select: { posts: true } } },
      orderBy: { posts: { _count: 'desc' } },
    }),
    prisma.user.findMany({
      take: 5,
      include: { _count: { select: { posts: true, followers: true } } },
      orderBy: { posts: { _count: 'desc' } },
    }),
  ])

  return (
    <aside className="space-y-5">
      {/* Popular Tags */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Popular Tags</h3>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`} className="tag-chip">
              #{tag.name} <span className="ml-1 text-gray-400">{tag._count.posts}</span>
            </Link>
          ))}
          {tags.length === 0 && <p className="text-sm text-gray-400">No tags yet.</p>}
        </div>
        <Link href="/tags" className="mt-3 block text-xs text-brand-500 hover:text-brand-700 font-medium">
          View all tags →
        </Link>
      </div>

      {/* Top Authors */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Top Authors</h3>
        <ul className="space-y-2.5">
          {topAuthors.map((author) => (
            <li key={author.id}>
              <Link href={`/profile/${author.id}`} className="flex items-center gap-2.5 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={author.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name ?? 'U')}&background=6366f1&color=fff&size=64`}
                  alt={author.name ?? ''}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-brand-600">{author.name}</p>
                  <p className="text-xs text-gray-400">{author._count.posts} articles · {author._count.followers} followers</p>
                </div>
              </Link>
            </li>
          ))}
          {topAuthors.length === 0 && <p className="text-sm text-gray-400">No authors yet.</p>}
        </ul>
      </div>

      {/* About */}
      <div className="card p-4 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <h3 className="font-semibold mb-1">About VidHub</h3>
        <p className="text-sm text-brand-100 mb-3">A community for tech enthusiasts. Share knowledge, ask questions, and grow together.</p>
        <Link href="/auth/register" className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white text-brand-700 text-sm font-medium hover:bg-brand-50 transition-colors">
          Join for free →
        </Link>
      </div>
    </aside>
  )
}
