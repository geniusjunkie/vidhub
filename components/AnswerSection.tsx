'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getAvatarUrl, timeAgo } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Answer {
  id: string
  content: string
  accepted: boolean
  createdAt: Date | string
  author: { id: string; name?: string | null; image?: string | null }
  votes: { value: number }[]
}

interface Props {
  questionId: string
  answers: Answer[]
  isLoggedIn: boolean
  currentUserId?: string
  isQuestionAuthor: boolean
  isSolved: boolean
}

export default function AnswerSection({ questionId, answers: initial, isLoggedIn, currentUserId, isQuestionAuthor, isSolved }: Props) {
  const router = useRouter()
  const [answers, setAnswers] = useState(initial)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    const res = await fetch('/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text, questionId }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error('Failed'); return }
    setAnswers((a) => [...a, { ...data, votes: [] }])
    setText('')
    router.refresh()
  }

  async function accept(answerId: string) {
    const res = await fetch(`/api/answers/${answerId}/accept`, { method: 'PATCH' })
    if (!res.ok) { toast.error('Failed'); return }
    toast.success('Answer accepted!')
    router.refresh()
  }

  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h3>

      <div className="space-y-6 mb-10">
        {answers.map((ans) => {
          const score = ans.votes.reduce((s, v) => s + v.value, 0)
          return (
            <div key={ans.id} className={`card p-5 ${ans.accepted ? 'border-accent-400 ring-1 ring-accent-400' : ''}`}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span className="text-lg font-bold text-gray-700">{score}</span>
                  {ans.accepted && (
                    <svg className="w-6 h-6 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: ans.content }} />
                  <div className="flex items-center gap-3">
                    <Image src={getAvatarUrl(ans.author.name, ans.author.image)} alt="" width={24} height={24} className="rounded-full" />
                    <span className="text-xs text-gray-500">{ans.author.name} · {timeAgo(ans.createdAt)}</span>
                    {isQuestionAuthor && !isSolved && !ans.accepted && (
                      <button onClick={() => accept(ans.id)} className="ml-auto text-xs btn-secondary text-accent-600 border-accent-200">
                        ✓ Accept answer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {answers.length === 0 && (
          <div className="card p-8 text-center text-gray-400">No answers yet. Be the first!</div>
        )}
      </div>

      {isLoggedIn ? (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Your Answer</h4>
          <form onSubmit={submit} className="space-y-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              required
              placeholder="Write your answer in Markdown…"
              className="input font-mono text-sm resize-y"
            />
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Posting…' : 'Post Answer'}
            </button>
          </form>
        </div>
      ) : (
        <p className="text-sm text-gray-500 card p-4 text-center">
          <a href="/auth/login" className="text-brand-600 font-medium hover:underline">Sign in</a> to post an answer.
        </p>
      )}
    </section>
  )
}
