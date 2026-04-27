'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getAvatarUrl, timeAgo } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Comment {
  id: string
  content: string
  createdAt: Date | string
  author: { id: string; name?: string | null; image?: string | null }
}

interface Props {
  targetId: string
  targetType: 'post' | 'question'
  comments: Comment[]
  isLoggedIn: boolean
  currentUserId?: string
}

export default function CommentSection({ targetId, targetType, comments: initial, isLoggedIn, currentUserId }: Props) {
  const router = useRouter()
  const [comments, setComments] = useState(initial)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    if (!isLoggedIn) { toast.error('Sign in to comment'); return }
    setLoading(true)
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text, targetId, targetType }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error('Failed'); return }
    setComments((c) => [...c, data])
    setText('')
    router.refresh()
  }

  async function deleteComment(id: string) {
    const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' })
    if (!res.ok) { toast.error('Failed to delete'); return }
    setComments((c) => c.filter((cm) => cm.id !== id))
  }

  return (
    <section className="mt-8">
      <h3 className="font-semibold text-gray-900 mb-4">{comments.length} Comments</h3>

      <div className="space-y-4 mb-6">
        {comments.map((cm) => (
          <div key={cm.id} className="flex gap-3">
            <Image src={getAvatarUrl(cm.author.name, cm.author.image)} alt="" width={32} height={32} className="rounded-full shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-800">{cm.author.name}</span>
                <span className="text-xs text-gray-400">{timeAgo(cm.createdAt)}</span>
                {currentUserId === cm.author.id && (
                  <button onClick={() => deleteComment(cm.id)} className="ml-auto text-xs text-red-400 hover:text-red-600">Delete</button>
                )}
              </div>
              <p className="text-sm text-gray-600">{cm.content}</p>
            </div>
          </div>
        ))}
      </div>

      {isLoggedIn ? (
        <form onSubmit={submit} className="flex gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder="Add a comment…"
            className="input flex-1 resize-none"
          />
          <button type="submit" disabled={loading} className="btn-primary self-end">
            {loading ? '…' : 'Post'}
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-400">
          <a href="/auth/login" className="text-brand-600 font-medium hover:underline">Sign in</a> to leave a comment.
        </p>
      )}
    </section>
  )
}
