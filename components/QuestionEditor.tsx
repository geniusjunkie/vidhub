'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function QuestionEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: fd.get('title'),
        content,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error(data.error ?? 'Failed'); return }
    toast.success('Question posted!')
    router.push(`/questions/${data.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="card p-4 bg-blue-50 border-blue-100 text-sm text-blue-700">
        <strong>Tips for a great question:</strong> Be specific, include what you&apos;ve tried, and show relevant code.
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          name="title"
          type="text"
          required
          placeholder="How do I…?"
          className="input text-base"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          type="text"
          placeholder="javascript, react"
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Details (Markdown)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          required
          placeholder="Describe your problem in detail…"
          className="input font-mono text-sm resize-y"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Posting…' : 'Post Question'}
      </button>
    </form>
  )
}
