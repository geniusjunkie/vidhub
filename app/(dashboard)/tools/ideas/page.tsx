'use client'
import Header from '@/components/dashboard/Header'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function IdeasPage() {
  const [niche, setNiche] = useState('')
  const [count, setCount] = useState('10')
  const [ideas, setIdeas] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!niche.trim()) { toast.error('Enter your niche'); return }
    setLoading(true)
    const res = await fetch('/api/ai/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche, count: parseInt(count) }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error(data.error); return }
    setIdeas(data.ideas)
  }

  return (
    <div className="flex flex-col flex-1">
      <Header title="Idea Generator" />
      <div className="flex-1 p-6 max-w-3xl">
        <p className="text-gray-400 text-sm mb-6">Never run out of content ideas. Generate viral video concepts for your niche.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Niche</label>
            <input value={niche} onChange={e => setNiche(e.target.value)} className="input-dark" placeholder="e.g. fitness, personal finance, cooking" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Number of Ideas</label>
            <select value={count} onChange={e => setCount(e.target.value)} className="input-dark">
              {['5', '10', '20', '30'].map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary">
            {loading ? 'Generating…' : '💡 Generate Ideas (1 credit)'}
          </button>
        </div>

        {ideas.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Your Ideas ({ideas.length})</h3>
              <button
                onClick={() => { navigator.clipboard.writeText(ideas.join('\n')); toast.success('Copied!') }}
                className="btn-ghost text-xs"
              >Copy all</button>
            </div>
            <div className="space-y-2">
              {ideas.map((idea, i) => (
                <div key={i} className="card-dark p-4 flex items-start gap-3">
                  <span className="text-brand-400 font-bold text-sm min-w-[1.5rem]">{i + 1}.</span>
                  <p className="text-sm text-gray-300">{idea}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
