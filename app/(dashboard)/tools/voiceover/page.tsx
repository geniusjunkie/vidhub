'use client'
import Header from '@/components/dashboard/Header'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ELEVENLABS_VOICES } from '@/lib/elevenlabs'

export default function VoiceoverPage() {
  const [text, setText] = useState('')
  const [voiceId, setVoiceId] = useState(ELEVENLABS_VOICES[0].id)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!text.trim()) { toast.error('Enter some text'); return }
    setLoading(true)
    const res = await fetch('/api/ai/voiceover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceId }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error(data.error); return }
    setResult(data.audioUrl)
  }

  return (
    <div className="flex flex-col flex-1">
      <Header title="AI Voiceover" />
      <div className="flex-1 p-6 max-w-3xl">
        <p className="text-gray-400 text-sm mb-6">Convert any script into studio-quality voiceovers with 35+ AI voices.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Script / Text</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              rows={6}
              className="input-dark resize-none"
              placeholder="Paste your script here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Voice</label>
            <select value={voiceId} onChange={e => setVoiceId(e.target.value)} className="input-dark">
              {ELEVENLABS_VOICES.map(v => (
                <option key={v.id} value={v.id}>{v.name} — {v.accent} · {v.style}</option>
              ))}
            </select>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary">
            {loading ? 'Generating…' : '🎙️ Generate Voiceover (3 credits)'}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <h3 className="font-semibold text-white mb-3">Your Voiceover</h3>
            {result === 'DEMO_AUDIO_URL' ? (
              <div className="card-dark p-5 text-sm text-gray-400">
                Demo mode — add your ElevenLabs API key to generate real audio.
              </div>
            ) : (
              <audio controls className="w-full mt-2">
                <source src={result} type="audio/mpeg" />
              </audio>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
