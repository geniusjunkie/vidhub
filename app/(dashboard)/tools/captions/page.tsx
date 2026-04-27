'use client'
import Header from '@/components/dashboard/Header'
import { useState } from 'react'
import toast from 'react-hot-toast'

const STYLES = [
  { id: 'bold-white', label: 'Bold White', preview: 'text-white font-black' },
  { id: 'yellow-outline', label: 'Yellow Outline', preview: 'text-yellow-400 font-bold' },
  { id: 'gradient', label: 'Gradient', preview: 'bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent font-bold' },
  { id: 'minimal', label: 'Minimal', preview: 'text-gray-300 font-medium' },
]

export default function CaptionsPage() {
  const [transcript, setTranscript] = useState('')
  const [style, setStyle] = useState('bold-white')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!transcript.trim()) { toast.error('Enter transcript text'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    const lines = transcript.split(/[.!?]+/).map(s => s.trim()).filter(Boolean)
    setResult(lines.slice(0, 10).join('\n'))
    toast.success('Captions generated!')
  }

  const selectedStyle = STYLES.find(s => s.id === style)

  return (
    <div className="flex flex-col flex-1">
      <Header title="Auto Captions" />
      <div className="flex-1 p-6 max-w-3xl">
        <p className="text-gray-400 text-sm mb-6">Add styled, auto-synced captions to your videos for maximum engagement.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Transcript</label>
            <textarea
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              rows={5}
              className="input-dark resize-none"
              placeholder="Paste your video transcript here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Caption Style</label>
            <div className="grid grid-cols-2 gap-3">
              {STYLES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`card-dark p-4 text-left transition-colors ${style === s.id ? 'border-brand-500/50' : ''}`}
                >
                  <span className={`text-sm ${s.preview}`}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary">
            {loading ? 'Processing…' : '💬 Generate Captions (2 credits)'}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Caption Preview</h3>
              <button onClick={() => { navigator.clipboard.writeText(result); toast.success('Copied!') }} className="btn-ghost text-xs">Copy SRT</button>
            </div>
            <div className="card-dark p-5 space-y-3">
              {result.split('\n').map((line, i) => (
                <div key={i} className={`text-sm ${selectedStyle?.preview}`}>{line}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
