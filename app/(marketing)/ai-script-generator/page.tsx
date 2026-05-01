import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'AI Script Generator — Write Video Scripts in Seconds',
  description: 'Generate engaging video scripts for TikTok, YouTube Shorts, and Reels with AI. Choose your tone, duration, and topic — get a ready-to-record script instantly.',
}

export default function Page() {
  return (
    <ToolPage
      badge="AI Script Generator"
      title="Write viral video scripts"
      titleHighlight="with AI"
      description="Stop staring at a blank page. Our AI script generator writes engaging, platform-optimized scripts for TikTok, YouTube Shorts, and Instagram Reels in seconds."
      ctaLabel="Generate a script free"
      ctaHref="/dashboard/tools/script"
      features={[
        { icon: '🎯', title: 'Topic to Script Instantly', desc: 'Enter any topic and get a complete, ready-to-record script with hooks, body, and CTA.' },
        { icon: '🎭', title: '6 Tone Options', desc: 'Professional, casual, funny, inspirational, educational, or dramatic — match your brand voice.' },
        { icon: '⏱️', title: 'Optimized for Short-Form', desc: 'Scripts calibrated for 15s, 30s, 60s, and 90s — perfect pacing for every platform.' },
        { icon: '📋', title: 'One-Click Copy', desc: 'Copy your script directly to clipboard and paste into your teleprompter or editor.' },
      ]}
    />
  )
}
