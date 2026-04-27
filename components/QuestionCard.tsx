import Link from 'next/link'
import Image from 'next/image'
import { timeAgo, getAvatarUrl, truncate } from '@/lib/utils'

interface QuestionCardProps {
  question: {
    id: string
    title: string
    content: string
    createdAt: Date | string
    views: number
    solved: boolean
    author: { id: string; name?: string | null; image?: string | null }
    tags: { tag: { name: string; slug: string } }[]
    _count?: { answers?: number; votes?: number }
  }
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <article className="card p-5 hover:shadow-md transition-shadow group">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1 text-center shrink-0 w-12">
          <span className="text-sm font-bold text-gray-700">{question._count?.votes ?? 0}</span>
          <span className="text-xs text-gray-400">votes</span>
          <span className={`text-sm font-bold ${question.solved ? 'text-accent-500' : 'text-gray-700'}`}>
            {question._count?.answers ?? 0}
          </span>
          <span className={`text-xs ${question.solved ? 'text-accent-500' : 'text-gray-400'}`}>ans</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            {question.solved && (
              <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent-400/10 text-accent-600">
                Solved
              </span>
            )}
            <Link href={`/questions/${question.id}`} className="group-hover:text-brand-600 font-semibold text-gray-900 transition-colors leading-snug">
              {question.title}
            </Link>
          </div>

          <p className="text-sm text-gray-500 mb-3">{truncate(question.content.replace(/[#*`]/g, ''), 140)}</p>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-wrap gap-1.5">
              {question.tags.slice(0, 4).map(({ tag }) => (
                <Link key={tag.slug} href={`/tags/${tag.slug}`} className="tag-chip">
                  #{tag.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Image src={getAvatarUrl(question.author.name, question.author.image)} alt="" width={18} height={18} className="rounded-full" />
              <Link href={`/profile/${question.author.id}`} className="hover:text-brand-600">{question.author.name}</Link>
              <span>·</span>
              <span>{timeAgo(question.createdAt)}</span>
              <span>·</span>
              <span>{question.views} views</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
