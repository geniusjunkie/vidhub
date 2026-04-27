import { prisma } from '@/lib/prisma'
import PostCard from '@/components/PostCard'
import QuestionCard from '@/components/QuestionCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Search' }

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q?.trim() ?? ''

  const [posts, questions] = q
    ? await Promise.all([
        prisma.post.findMany({
          where: {
            published: true,
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { content: { contains: q, mode: 'insensitive' } },
            ],
          },
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { id: true, name: true, image: true } },
            tags: { include: { tag: true } },
            _count: { select: { votes: true, comments: true } },
          },
        }),
        prisma.question.findMany({
          where: {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { content: { contains: q, mode: 'insensitive' } },
            ],
          },
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { id: true, name: true, image: true } },
            tags: { include: { tag: true } },
            _count: { select: { answers: true, votes: true } },
          },
        }),
      ])
    : [[], []]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Search</h1>
      {q && <p className="text-gray-500 mb-6">Results for <strong>&quot;{q}&quot;</strong> — {posts.length + questions.length} found</p>}

      {!q && (
        <form className="mb-8">
          <input name="q" type="search" placeholder="Search articles and questions…" className="input max-w-lg" autoFocus />
        </form>
      )}

      {posts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Articles</h2>
          <div className="space-y-4">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>
        </section>
      )}

      {questions.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Questions</h2>
          <div className="space-y-4">{questions.map((q) => <QuestionCard key={q.id} question={q} />)}</div>
        </section>
      )}

      {q && posts.length === 0 && questions.length === 0 && (
        <div className="card p-10 text-center text-gray-400">No results found for &quot;{q}&quot;</div>
      )}
    </div>
  )
}
