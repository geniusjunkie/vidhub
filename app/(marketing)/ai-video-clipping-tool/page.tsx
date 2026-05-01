import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'AI Video Clipping Tool — Clip Videos Automatically',
  description: 'The fastest AI video clipping tool for content creators. Auto-detect highlights, clip to 9:16, add captions, and export for every platform.',
}

export default function Page() {
  return (
    <ToolPage
      badge="AI Video Clipping Tool"
      title="Clip your videos"
      titleHighlight="automatically with AI"
      description="Stop spending hours scrubbing through footage. VidHub's AI detects the best moments in your videos and clips them into short-form content automatically."
      ctaLabel="Get early access"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '🔍', title: 'Highlight Detection', desc: 'AI scans your video for peak moments — laughs, key points, emotional beats — and clips them.' },
        { icon: '📱', title: '9:16 Auto-Reframe', desc: 'Converts landscape video to portrait automatically, keeping the subject centered.' },
        { icon: '⏱️', title: 'Custom Clip Length', desc: 'Set your desired clip length from 15s to 3 minutes and let AI do the trimming.' },
        { icon: '🚀', title: 'Batch Export', desc: 'Export all clips simultaneously, formatted for TikTok, Reels, and YouTube Shorts.' },
      ]}
    />
  )
}
