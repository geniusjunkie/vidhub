'use client'
import Header from '@/components/dashboard/Header'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function VideoRankingPage() {
  const [topic, setTopic] = useState('')
  const [items, setItems] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!topic.trim() || !items.trim()) { toast.error('Fill in all fields'); return }
    const list = items.split('\n').map(s => s.trim()).filter(Boolean)
    if (list.length < 2) { toast.error('Enter at least 2 items to rank'); return }
    setLoading(true)
    const res = await fetch('/api/ai/script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: `Top ${list.length} ${topic} ranking video: ${list.join(', ')}`,
        tone: 'Dramatic',
        duration: '60 seconds',
      }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error(data.error); return }
    setResult(data.script)
  }

  return (
    <div className="flex flex-col flex-1">
      <Header title="Video Ranking" />
      <div className="flex-1 p-6 max-w-3xl">
        <p className="text-gray-400 text-sm mb-6">Build viral comparison and ranking videos — "Top 5 X" style content.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category / Topic</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} className="input-dark" placeholder="e.g. productivity apps, morning routines" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Items to Rank (one per line)</label>
            <textarea
              value={items}
              onChange={e => setItems(e.target.value)}
              rows={6}
              className="input-dark resize-none"
              placeholder={"Notion\nObsidian\nRoam Research\nLogseq"}
            />
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary">
            {loading ? 'Building…' : '🏆 Build Ranking Video (3 credits)'}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Ranking Script</h3>
              <button onClick={() => { navigator.clipboard.writeText(result); toast.success('Copied!') }} className="btn-ghost text-xs">Copy</button>
            </div>
            <div className="card-dark p-5 whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{result}</div>
          </div>
        )}
      </div>
    </div>
  )
}
