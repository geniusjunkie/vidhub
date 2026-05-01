import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'AI Clip Maker — Auto-Clip Long Videos into Shorts',
  description: 'Automatically clip your long-form videos into viral short clips for TikTok, Reels, and YouTube Shorts. Save hours of editing with AI.',
}

export default function Page() {
  return (
    <ToolPage
      badge="AI Clip Maker"
      title="Turn long videos into"
      titleHighlight="viral short clips"
      description="Upload a long video and let AI find the best moments, cut them into clips, and format them for every platform — in minutes, not hours."
      ctaLabel="Get early access"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '✂️', title: 'Smart Auto-Clipping', desc: 'AI analyzes your video and identifies the highest-engagement moments automatically.' },
        { icon: '📐', title: 'Auto-Reframe for 9:16', desc: 'Automatically reframes horizontal footage to portrait for TikTok, Reels, and Shorts.' },
        { icon: '🎯', title: 'Clip Multiple Highlights', desc: 'Extract 5–20 clips from a single long video and export them all at once.' },
        { icon: '📝', title: 'Add Captions Automatically', desc: 'AI adds styled captions to every clip so they are ready to post immediately.' },
      ]}
    />
  )
}
