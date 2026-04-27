import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Tags' }

export default async function TagsPage() {
  const tags = await prisma.tag.findMany({
    include: { _count: { select: { posts: true, questions: true } } },
    orderBy: { posts: { _count: 'desc' } },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Tags</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tags.map((tag) => (
          <Link key={tag.id} href={`/tags/${tag.slug}`} className="card p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: tag.color }}
              />
              <span className="font-semibold text-gray-900 group-hover:text-brand-600">#{tag.name}</span>
            </div>
            {tag.description && <p className="text-xs text-gray-500 mb-2">{tag.description}</p>}
            <p className="text-xs text-gray-400">{tag._count.posts} articles · {tag._count.questions} questions</p>
          </Link>
        ))}
        {tags.length === 0 && <p className="text-gray-400 col-span-3 text-center py-10">No tags yet.</p>}
      </div>
    </div>
  )
}
