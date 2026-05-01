import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'AI TikTok Video Generator — Create TikToks with AI',
  description: 'Generate viral TikTok videos with AI. Scripts, voiceovers, captions, and ideas — all in one tool. Post more, grow faster.',
}

export default function Page() {
  return (
    <ToolPage
      badge="AI TikTok Generator"
      title="Go viral on TikTok"
      titleHighlight="with AI-generated videos"
      description="VidHub generates everything you need for a viral TikTok — hook, script, voiceover, and captions — in under a minute. Consistency made easy."
      ctaLabel="Start creating"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '🎵', title: 'Viral Hook Generator', desc: 'AI crafts attention-grabbing first 3 seconds designed to stop the scroll.' },
        { icon: '🎙️', title: 'TikTok-Ready Voiceovers', desc: 'Choose AI voices that match the TikTok energy — energetic, trendy, and engaging.' },
        { icon: '✍️', title: 'On-Screen Captions', desc: 'Bold, styled captions auto-synced to speech for accessibility and algorithm boost.' },
        { icon: '💡', title: 'Trend-Based Ideas', desc: 'Generate content ideas based on your niche that align with what is currently trending.' },
      ]}
    />
  )
}
