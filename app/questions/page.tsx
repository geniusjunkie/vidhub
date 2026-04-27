import { prisma } from '@/lib/prisma'
import QuestionCard from '@/components/QuestionCard'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Q&A' }

export default async function QuestionsPage({ searchParams }: { searchParams: { page?: string; filter?: string } }) {
  const page = Math.max(1, Number(searchParams.page ?? 1))
  const filter = searchParams.filter ?? 'newest'
  const limit = 15

  const orderBy =
    filter === 'unanswered'
      ? { createdAt: 'desc' as const }
      : filter === 'views'
      ? { views: 'desc' as const }
      : { createdAt: 'desc' as const }

  const where = filter === 'unanswered' ? { answers: { none: {} } } : {}

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
      include: {
        author: { select: { id: true, name: true, image: true } },
        tags: { include: { tag: true } },
        _count: { select: { answers: true, votes: true } },
      },
    }),
    prisma.question.count({ where }),
  ])

  const pages = Math.ceil(total / limit)
  const filters = [
    { key: 'newest', label: 'Newest' },
    { key: 'views', label: 'Most Viewed' },
    { key: 'unanswered', label: 'Unanswered' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Q&amp;A</h1>
          <Link href="/questions/new" className="btn-primary">Ask Question</Link>
        </div>

        <div className="flex gap-1 mb-5 border-b border-gray-200 pb-0">
          {filters.map((f) => (
            <Link
              key={f.key}
              href={`/questions?filter=${f.key}`}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                filter === f.key ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          {questions.map((q) => <QuestionCard key={q.id} question={q} />)}
          {questions.length === 0 && (
            <div className="card p-10 text-center text-gray-400">No questions yet. Ask one!</div>
          )}
        </div>

        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/questions?page=${p}&filter=${filter}`}
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
