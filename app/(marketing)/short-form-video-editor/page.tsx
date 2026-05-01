import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'Short-Form Video Editor — AI-Powered Editing for Creators',
  description: 'The best AI short-form video editor for TikTok, Reels, and Shorts. Auto-captions, voiceovers, clipping, and scripts — all in one place.',
}

export default function Page() {
  return (
    <ToolPage
      badge="Short-Form Video Editor"
      title="The AI editor built for"
      titleHighlight="short-form creators"
      description="VidHub is the all-in-one short-form video editor that handles everything from idea to export. Less time editing, more time creating — and more consistent posting."
      ctaLabel="Start editing free"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '✂️', title: 'AI-Powered Trimming', desc: 'Remove silences, filler words, and dead space automatically for tighter, more engaging clips.' },
        { icon: '✍️', title: 'Auto Captions', desc: 'Accurate captions in any style, synced to audio — no manual timing required.' },
        { icon: '🎙️', title: 'Voiceover Generator', desc: 'Replace or supplement your audio with 35+ professional AI voices in seconds.' },
        { icon: '📱', title: 'Export for Every Platform', desc: 'One-click export in the right format, resolution, and aspect ratio for TikTok, Reels, and Shorts.' },
      ]}
    />
  )
}
