'use client'
import Header from '@/components/dashboard/Header'
import { useState } from 'react'
import toast from 'react-hot-toast'

const FORMATS = ['React/Commentary', 'Documentary', 'Tutorial', 'Storytelling', 'News Report']

export default function CommentaryPage() {
  const [script, setScript] = useState('')
  const [format, setFormat] = useState('React/Commentary')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!script.trim()) { toast.error('Enter your script or idea'); return }
    setLoading(true)
    const res = await fetch('/api/ai/script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: `${format} video breakdown: ${script}`,
        tone: 'Casual',
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
      <Header title="Commentary" />
      <div className="flex-1 p-6 max-w-3xl">
        <p className="text-gray-400 text-sm mb-6">Transform scripts into detailed video scene breakdowns with commentary.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Script or Idea</label>
            <textarea
              value={script}
              onChange={e => setScript(e.target.value)}
              rows={5}
              className="input-dark resize-none"
              placeholder="Paste a script or describe the video concept..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Commentary Format</label>
            <select value={format} onChange={e => setFormat(e.target.value)} className="input-dark">
              {FORMATS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary">
            {loading ? 'Generating…' : '🎬 Generate Commentary (2 credits)'}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Scene Breakdown</h3>
              <button onClick={() => { navigator.clipboard.writeText(result); toast.success('Copied!') }} className="btn-ghost text-xs">Copy</button>
            </div>
            <div className="card-dark p-5 whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{result}</div>
          </div>
        )}
      </div>
    </div>
  )
}
