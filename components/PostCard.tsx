import Link from 'next/link'
import Image from 'next/image'
import { timeAgo, getAvatarUrl, truncate } from '@/lib/utils'

interface PostCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt?: string | null
    createdAt: Date | string
    views: number
    author: { id: string; name?: string | null; image?: string | null }
    tags: { tag: { name: string; slug: string } }[]
    _count?: { votes?: number; comments?: number }
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="card p-5 hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-2.5 mb-3">
        <Link href={`/profile/${post.author.id}`}>
          <Image
            src={getAvatarUrl(post.author.name, post.author.image)}
            alt={post.author.name ?? 'Author'}
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/profile/${post.author.id}`} className="text-sm font-medium text-gray-800 hover:text-brand-600">
            {post.author.name ?? 'Anonymous'}
          </Link>
          <span className="text-xs text-gray-400">{timeAgo(post.createdAt)}</span>
        </div>
      </div>

      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-base font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1.5 leading-snug">
          {post.title}
        </h2>
      </Link>

      {post.excerpt && (
        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
          {truncate(post.excerpt, 160)}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map(({ tag }) => (
            <Link key={tag.slug} href={`/tags/${tag.slug}`} className="tag-chip">
              #{tag.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 shrink-0">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {post.views}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            {post._count?.votes ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post._count?.comments ?? 0}
          </span>
        </div>
      </div>
    </article>
  )
}
