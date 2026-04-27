import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PostCard from '@/components/PostCard'
import QuestionCard from '@/components/QuestionCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await prisma.tag.findUnique({ where: { slug: params.slug }, select: { name: true } })
  return { title: `#${tag?.name ?? params.slug}` }
}

export default async function TagPage({ params, searchParams }: { params: { slug: string }; searchParams: { tab?: string } }) {
  const tab = searchParams.tab ?? 'posts'

  const tag = await prisma.tag.findUnique({
    where: { slug: params.slug },
    include: { _count: { select: { posts: true, questions: true } } },
  })
  if (!tag) notFound()

  const posts = tab === 'posts'
    ? await prisma.post.findMany({
        where: { published: true, tags: { some: { tagId: tag.id } } },
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: {
          author: { select: { id: true, name: true, image: true } },
          tags: { include: { tag: true } },
          _count: { select: { votes: true, comments: true } },
        },
      })
    : []

  const questions = tab === 'questions'
    ? await prisma.question.findMany({
        where: { tags: { some: { tagId: tag.id } } },
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: {
          author: { select: { id: true, name: true, image: true } },
          tags: { include: { tag: true } },
          _count: { select: { answers: true, votes: true } },
        },
      })
    : []

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-4 h-4 rounded-full" style={{ background: tag.color }} />
        <h1 className="text-2xl font-bold text-gray-900">#{tag.name}</h1>
        <span className="text-sm text-gray-400">{tag._count.posts + tag._count.questions} items</span>
      </div>
      {tag.description && <p className="text-gray-600 mb-6">{tag.description}</p>}

      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {[
          { key: 'posts', label: `Articles (${tag._count.posts})` },
          { key: 'questions', label: `Questions (${tag._count.questions})` },
        ].map((t) => (
          <Link key={t.key} href={`/tags/${params.slug}?tab=${t.key}`}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t.key ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
            {t.label}
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {tab === 'posts' && posts.map((p) => <PostCard key={p.id} post={p} />)}
        {tab === 'questions' && questions.map((q) => <QuestionCard key={q.id} question={q} />)}
        {((tab === 'posts' && posts.length === 0) || (tab === 'questions' && questions.length === 0)) && (
          <div className="card p-8 text-center text-gray-400">Nothing here yet.</div>
        )}
      </div>
    </div>
  )
}
