import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { timeAgo, getAvatarUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import VoteButtons from '@/components/VoteButtons'
import AnswerSection from '@/components/AnswerSection'
import CommentSection from '@/components/CommentSection'
import type { Metadata } from 'next'

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const q = await prisma.question.findUnique({ where: { id: params.id }, select: { title: true } })
  return { title: q?.title ?? 'Question' }
}

export default async function QuestionPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id

  const question = await prisma.question.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      tags: { include: { tag: true } },
      comments: { include: { author: { select: { id: true, name: true, image: true } } }, orderBy: { createdAt: 'asc' } },
      answers: {
        include: {
          author: { select: { id: true, name: true, image: true } },
          votes: true,
        },
        orderBy: [{ accepted: 'desc' }, { createdAt: 'asc' }],
      },
      _count: { select: { votes: true, answers: true } },
    },
  })

  if (!question) notFound()

  await prisma.question.update({ where: { id: question.id }, data: { views: { increment: 1 } } })

  const userVote = userId
    ? await prisma.vote.findUnique({ where: { userId_questionId: { userId, questionId: question.id } } })
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-wrap gap-2 mb-3">
        {question.tags.map(({ tag }) => (
          <Link key={tag.slug} href={`/tags/${tag.slug}`} className="tag-chip">{tag.name}</Link>
        ))}
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
        {question.solved && <span className="mr-2 text-accent-500">✓</span>}
        {question.title}
      </h1>

      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
        <Image src={getAvatarUrl(question.author.name, question.author.image)} alt="" width={36} height={36} className="rounded-full" />
        <div>
          <Link href={`/profile/${question.author.id}`} className="text-sm font-medium hover:text-brand-600">{question.author.name}</Link>
          <div className="text-xs text-gray-400">{timeAgo(question.createdAt)} · {question.views} views</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <VoteButtons targetId={question.id} targetType="question" initialVotes={question._count.votes} userVote={userVote?.value ?? 0} isLoggedIn={!!userId} />
        </div>
      </div>

      <div className="prose prose-gray max-w-none mb-6" dangerouslySetInnerHTML={{ __html: question.content }} />

      <CommentSection targetId={question.id} targetType="question" comments={question.comments} isLoggedIn={!!userId} currentUserId={userId} />

      <AnswerSection
        questionId={question.id}
        answers={question.answers}
        isLoggedIn={!!userId}
        currentUserId={userId}
        isQuestionAuthor={userId === question.authorId}
        isSolved={question.solved}
      />
    </div>
  )
}
