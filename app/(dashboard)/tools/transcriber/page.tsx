'use client'
import Header from '@/components/dashboard/Header'
import { useState, useRef } from 'react'
import toast from 'react-hot-toast'

export default function TranscriberPage() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function transcribe() {
    if (!url.trim()) { toast.error('Enter a video URL'); return }
    setLoading(true)
    const res = await fetch('/api/ai/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error(data.error); return }
    setResult(data.transcript)
  }

  return (
    <div className="flex flex-col flex-1">
      <Header title="Transcriber" />
      <div className="flex-1 p-6 max-w-3xl">
        <p className="text-gray-400 text-sm mb-6">Convert any video or audio to text in minutes with AI transcription.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Video / Audio URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} className="input-dark" placeholder="https://..." />
          </div>
          <button onClick={transcribe} disabled={loading} className="btn-primary">
            {loading ? 'Transcribing…' : '📄 Transcribe (5 credits)'}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Transcript</h3>
              <button onClick={() => { navigator.clipboard.writeText(result); toast.success('Copied!') }} className="btn-ghost text-xs">Copy</button>
            </div>
            <div className="card-dark p-5 whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{result}</div>
          </div>
        )}
      </div>
    </div>
  )
}
