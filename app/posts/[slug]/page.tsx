import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { timeAgo, getAvatarUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import VoteButtons from '@/components/VoteButtons'
import CommentSection from '@/components/CommentSection'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug }, select: { title: true, excerpt: true } })
  return { title: post?.title ?? 'Article', description: post?.excerpt ?? '' }
}

export default async function PostPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id

  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
    include: {
      author: true,
      tags: { include: { tag: true } },
      comments: {
        include: { author: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: 'asc' },
      },
      _count: { select: { votes: true, comments: true } },
    },
  })

  if (!post) notFound()

  // Increment views
  await prisma.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } })

  const userVote = userId
    ? await prisma.postVote.findUnique({ where: { userId_postId: { userId, postId: post.id } } })
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(({ tag }) => (
          <Link key={tag.slug} href={`/tags/${tag.slug}`} className="tag-chip">{tag.name}</Link>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-5 leading-snug">{post.title}</h1>

      {/* Author bar */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
        <Link href={`/profile/${post.author.id}`}>
          <Image
            src={getAvatarUrl(post.author.name, post.author.image)}
            alt={post.author.name ?? ''}
            width={44}
            height={44}
            className="rounded-full"
          />
        </Link>
        <div>
          <Link href={`/profile/${post.author.id}`} className="font-semibold text-gray-900 hover:text-brand-600">
            {post.author.name}
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{timeAgo(post.createdAt)}</span>
            <span>·</span>
            <span>{post.views} views</span>
            <span>·</span>
            <span>{post._count.comments} comments</span>
          </div>
        </div>
        {userId === post.authorId && (
          <Link href={`/posts/${post.slug}/edit`} className="ml-auto btn-secondary text-xs">Edit</Link>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none mb-10" dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Vote */}
      <div className="flex items-center gap-4 py-5 border-y border-gray-100 mb-8">
        <VoteButtons
          targetId={post.id}
          targetType="post"
          initialVotes={post._count.votes}
          userVote={userVote?.value ?? 0}
          isLoggedIn={!!userId}
        />
      </div>

      {/* Comments */}
      <CommentSection
        targetId={post.id}
        targetType="post"
        comments={post.comments}
        isLoggedIn={!!userId}
        currentUserId={userId}
      />
    </div>
  )
}
