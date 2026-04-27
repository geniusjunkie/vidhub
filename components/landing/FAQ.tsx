'use client'
import { useState } from 'react'

const FAQS = [
  { q: 'What are credits?', a: 'Credits are used each time you generate content. Scripts use 2 credits, voiceovers use 3, images use 2, and video generation uses 5. Credits reset monthly.' },
  { q: 'Can I cancel anytime?', a: 'Yes — cancel any time from your dashboard. Your plan stays active until the end of the billing period with no extra charges.' },
  { q: 'Do I need a camera?', a: 'No. VidHub can generate everything you need — scripts, voiceovers, images, and even AI video footage — without you ever appearing on camera.' },
  { q: 'What platforms can I post to?', a: 'VidHub exports in the correct format for TikTok, Instagram Reels, YouTube Shorts, and Facebook. All exports are 9:16 vertical video.' },
  { q: 'How good is the AI voiceover?', a: 'We use ElevenLabs — the industry gold standard for AI voices. With 35+ voices and multiple accents, most viewers cannot distinguish them from human narration.' },
  { q: 'Is there a free trial?', a: 'Yes — sign up free and get 10 credits immediately. No credit card required. Upgrade when you need more.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-black text-white text-center mb-12">Frequently asked questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="card-dark overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
