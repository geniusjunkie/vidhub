import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAvatarUrl, timeAgo } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface Props { params: { username: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findFirst({ where: { OR: [{ id: params.username }, { username: params.username }] }, select: { name: true } })
  return { title: user?.name ?? 'Profile' }
}

export default async function ProfilePage({ params, searchParams }: { params: { username: string }; searchParams: { tab?: string } }) {
  const session = await getServerSession(authOptions)
  const viewerId = (session?.user as any)?.id
  const tab = searchParams.tab ?? 'posts'

  const user = await prisma.user.findFirst({
    where: { OR: [{ id: params.username }, { username: params.username }] },
    include: {
      _count: { select: { posts: true, followers: true, following: true, questions: true } },
    },
  })

  if (!user) notFound()

  const isFollowing = viewerId
    ? !!(await prisma.follow.findUnique({ where: { followerId_followingId: { followerId: viewerId, followingId: user.id } } }))
    : false

  const posts = tab === 'posts'
    ? await prisma.post.findMany({
        where: { authorId: user.id, published: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          author: { select: { id: true, name: true, image: true } },
          tags: { include: { tag: true } },
          _count: { select: { votes: true, comments: true } },
        },
      })
    : []

  const questions = tab === 'questions'
    ? await prisma.question.findMany({
        where: { authorId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          author: { select: { id: true, name: true, image: true } },
          tags: { include: { tag: true } },
          _count: { select: { answers: true, votes: true } },
        },
      })
    : []

  const tabs = [
    { key: 'posts', label: `Articles (${user._count.posts})` },
    { key: 'questions', label: `Questions (${user._count.questions})` },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Profile header */}
      <div className="card p-6 mb-8 flex flex-col sm:flex-row gap-5 items-start">
        <Image
          src={getAvatarUrl(user.name, user.image)}
          alt={user.name ?? ''}
          width={96}
          height={96}
          className="rounded-2xl ring-4 ring-brand-100"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          {user.username && <p className="text-sm text-gray-400 mb-1">@{user.username}</p>}
          {user.bio && <p className="text-gray-600 text-sm mb-3">{user.bio}</p>}
          <div className="flex gap-5 text-sm text-gray-500">
            <span><strong className="text-gray-900">{user._count.posts}</strong> articles</span>
            <span><strong className="text-gray-900">{user._count.followers}</strong> followers</span>
            <span><strong className="text-gray-900">{user._count.following}</strong> following</span>
          </div>
        </div>
        {viewerId && viewerId !== user.id && (
          <form action={`/api/follow`} method="POST">
            <input type="hidden" name="targetId" value={user.id} />
            <button className={isFollowing ? 'btn-secondary' : 'btn-primary'}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </form>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={`/profile/${params.username}?tab=${t.key}`}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.key ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {tab === 'posts' && posts.map((p) => <PostCard key={p.id} post={p} />)}
        {tab === 'questions' && questions.map((q) => (
          <div key={q.id} className="card p-4">
            <Link href={`/questions/${q.id}`} className="font-medium text-gray-900 hover:text-brand-600">{q.title}</Link>
            <div className="text-xs text-gray-400 mt-1">{timeAgo(q.createdAt)} · {q._count.answers} answers</div>
          </div>
        ))}
        {((tab === 'posts' && posts.length === 0) || (tab === 'questions' && questions.length === 0)) && (
          <div className="card p-8 text-center text-gray-400">Nothing here yet.</div>
        )}
      </div>
    </div>
  )
}
