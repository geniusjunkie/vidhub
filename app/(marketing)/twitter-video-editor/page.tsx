import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'Twitter Video Editor — Edit X/Twitter Videos with AI',
  description: 'Edit Twitter/X videos with AI. Auto-captions, scripts, and smart trimming to maximize engagement on X. Free to try.',
}

export default function Page() {
  return (
    <ToolPage
      badge="Twitter / X Video Editor"
      title="Edit Twitter videos that"
      titleHighlight="actually get engagement"
      description="Create short, punchy videos built for X (Twitter). VidHub's AI writes the script, adds captions, and trims your content to the perfect length for maximum engagement."
      ctaLabel="Start free"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '🐦', title: 'X-Optimized Scripts', desc: 'AI writes direct, opinionated scripts built for X\'s fast-scrolling audience.' },
        { icon: '✍️', title: 'Auto Captions', desc: 'Critical for X where most videos play muted — captions keep viewers watching.' },
        { icon: '✂️', title: 'Smart Trimming', desc: 'Cut to under 2 minutes 20 seconds automatically to maximize reach and impressions.' },
        { icon: '🎙️', title: 'AI Voiceover', desc: 'Add a confident, clear AI voice that performs well on X\'s audio-optional feed.' },
      ]}
    />
  )
}
