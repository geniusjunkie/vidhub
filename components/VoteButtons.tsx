'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Props {
  targetId: string
  targetType: 'post' | 'question' | 'answer'
  initialVotes: number
  userVote: number
  isLoggedIn: boolean
}

export default function VoteButtons({ targetId, targetType, initialVotes, userVote, isLoggedIn }: Props) {
  const router = useRouter()
  const [votes, setVotes] = useState(initialVotes)
  const [current, setCurrent] = useState(userVote)
  const [loading, setLoading] = useState(false)

  async function vote(value: 1 | -1) {
    if (!isLoggedIn) { toast.error('Sign in to vote'); return }
    if (loading) return
    setLoading(true)
    const newValue = current === value ? 0 : value
    const res = await fetch('/api/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetId, targetType, value: newValue }),
    })
    setLoading(false)
    if (!res.ok) { toast.error('Failed to vote'); return }
    setVotes((v) => v - current + newValue)
    setCurrent(newValue)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => vote(1)}
        disabled={loading}
        className={`p-1.5 rounded-lg transition-colors ${current === 1 ? 'bg-brand-100 text-brand-600' : 'text-gray-400 hover:text-brand-500 hover:bg-brand-50'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <span className="font-semibold text-gray-700 min-w-[2ch] text-center">{votes}</span>
      <button
        onClick={() => vote(-1)}
        disabled={loading}
        className={`p-1.5 rounded-lg transition-colors ${current === -1 ? 'bg-red-100 text-red-500' : 'text-gray-400 hover:text-red-400 hover:bg-red-50'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}
