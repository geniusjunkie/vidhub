'use client'
import Header from '@/components/dashboard/Header'
import { useState } from 'react'
import toast from 'react-hot-toast'

const TONES = ['Professional', 'Casual', 'Funny', 'Inspirational', 'Educational', 'Dramatic']
const DURATIONS = ['15 seconds', '30 seconds', '60 seconds', '90 seconds']

export default function ScriptPage() {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Casual')
  const [duration, setDuration] = useState('30 seconds')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!topic.trim()) { toast.error('Enter a topic'); return }
    setLoading(true)
    const res = await fetch('/api/ai/script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, tone, duration }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error(data.error); return }
    setResult(data.script)
  }

  return (
    <div className="flex flex-col flex-1">
      <Header title="Script Generator" />
      <div className="flex-1 p-6 max-w-3xl">
        <p className="text-gray-400 text-sm mb-6">Generate high-converting short-form video scripts in seconds.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Topic / Niche</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} className="input-dark" placeholder="e.g. 5 morning habits that changed my life" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="input-dark">
                {TONES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
              <select value={duration} onChange={e => setDuration(e.target.value)} className="input-dark">
                {DURATIONS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary">
            {loading ? 'Generating…' : '✨ Generate Script (2 credits)'}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Your Script</h3>
              <button onClick={() => { navigator.clipboard.writeText(result); toast.success('Copied!') }} className="btn-ghost text-xs">Copy</button>
            </div>
            <div className="card-dark p-5 whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{result}</div>
          </div>
        )}
      </div>
    </div>
  )
}
