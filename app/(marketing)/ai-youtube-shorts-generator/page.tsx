import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'AI YouTube Shorts Generator — Create Shorts Automatically',
  description: 'Generate scripts, voiceovers, and captions for YouTube Shorts with AI. Grow your channel with consistent short-form content. Free to try.',
}

export default function Page() {
  return (
    <ToolPage
      badge="YouTube Shorts Generator"
      title="Create YouTube Shorts"
      titleHighlight="10× faster with AI"
      description="Turn any idea into a complete YouTube Short — script, voiceover, captions, and all. VidHub automates the boring parts so you can post more and grow faster."
      ctaLabel="Try free"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '▶️', title: 'Shorts-Optimized Scripts', desc: 'AI generates scripts built for the YouTube Shorts format — fast hooks, tight pacing, strong CTAs.' },
        { icon: '🎙️', title: 'AI Voiceover', desc: 'Professional narration in seconds. Choose from 35+ voices that fit your channel style.' },
        { icon: '📊', title: 'SEO Titles & Descriptions', desc: 'Get AI-generated titles and descriptions optimized to rank in YouTube search.' },
        { icon: '⚡', title: 'Auto Captions', desc: 'Styled captions that keep viewers watching to the end — proven to increase retention.' },
      ]}
    />
  )
}
