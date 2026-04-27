'use client'
import Header from '@/components/dashboard/Header'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'

const STYLES = ['Photorealistic', 'Cinematic', 'Anime', 'Minimalist', 'Vintage', 'Neon', 'Watercolor']

export default function ImagePage() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('Photorealistic')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!prompt.trim()) { toast.error('Enter a prompt'); return }
    setLoading(true)
    const res = await fetch('/api/ai/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `${style} style: ${prompt}` }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { toast.error(data.error); return }
    setResult(data.imageUrl)
  }

  return (
    <div className="flex flex-col flex-1">
      <Header title="Image Generator" />
      <div className="flex-1 p-6 max-w-3xl">
        <p className="text-gray-400 text-sm mb-6">Generate stunning AI thumbnails and visuals for your videos.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={3}
              className="input-dark resize-none"
              placeholder="e.g. Dramatic sunrise over a city skyline, motivational vibes"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Style</label>
            <select value={style} onChange={e => setStyle(e.target.value)} className="input-dark">
              {STYLES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary">
            {loading ? 'Generating…' : '🖼️ Generate Image (4 credits)'}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Generated Image</h3>
              <a href={result} download className="btn-ghost text-xs">Download</a>
            </div>
            {result.startsWith('http') ? (
              <div className="relative w-full aspect-[9/16] max-w-sm rounded-xl overflow-hidden border border-white/10">
                <Image src={result} alt="Generated" fill className="object-cover" />
              </div>
            ) : (
              <div className="card-dark p-5 text-sm text-gray-400">
                Demo mode — add your Replicate API key to generate real images.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
