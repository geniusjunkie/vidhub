import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'AI Video Creator — Create Videos with AI Automatically',
  description: 'Create professional short-form videos with AI. Scripts, voiceovers, captions, and editing — all automated. The easiest AI video creator for content creators.',
}

export default function Page() {
  return (
    <ToolPage
      badge="AI Video Creator"
      title="Create professional videos"
      titleHighlight="with AI, not effort"
      description="VidHub is the AI video creator that handles everything — idea, script, voiceover, captions, and export. Go from zero to posted in under 5 minutes."
      ctaLabel="Start creating free"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '🧠', title: 'AI from Idea to Video', desc: 'Enter a topic and AI generates the full video pipeline — no creative block, no blank canvas.' },
        { icon: '🎙️', title: '35+ AI Voices', desc: 'Choose from a library of natural-sounding voices to narrate your videos professionally.' },
        { icon: '✍️', title: 'Auto Captions & Subtitles', desc: 'Captions added automatically in your choice of style — bold, gradient, minimal, and more.' },
        { icon: '📤', title: 'One-Click Export', desc: 'Export your finished video formatted perfectly for TikTok, Reels, Shorts, and LinkedIn.' },
      ]}
    />
  )
}
