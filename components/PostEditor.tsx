'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function PostEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, published: boolean) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: fd.get('title'),
        content,
        excerpt: fd.get('excerpt'),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        published,
      }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error(data.error ?? 'Failed'); return }
    toast.success(published ? 'Published!' : 'Saved as draft')
    router.push(`/posts/${data.slug}`)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-5">
      <div>
        <input
          name="title"
          type="text"
          required
          placeholder="Article title…"
          className="w-full text-2xl font-bold border-0 border-b-2 border-gray-200 focus:border-brand-500 focus:outline-none pb-2 bg-transparent placeholder-gray-300"
        />
      </div>

      <div>
        <input
          name="excerpt"
          type="text"
          placeholder="Short description (shown in previews)…"
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          type="text"
          placeholder="javascript, react, webdev"
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content (Markdown)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          required
          placeholder="Write your article in Markdown…"
          className="input font-mono text-sm resize-y"
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Publishing…' : 'Publish'}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={(e) => handleSubmit(e as any, false)}
          className="btn-secondary"
        >
          Save Draft
        </button>
      </div>
    </form>
  )
}
