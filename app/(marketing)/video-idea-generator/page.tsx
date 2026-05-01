import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'Video Idea Generator — AI Content Ideas for Creators',
  description: 'Never run out of video ideas again. Generate 5–30 viral content ideas for your niche in seconds with AI. Free to try.',
}

export default function Page() {
  return (
    <ToolPage
      badge="Video Idea Generator"
      title="Never run out of"
      titleHighlight="video ideas again"
      description="Enter your niche and get a batch of scroll-stopping video ideas instantly. Built for TikTok, YouTube Shorts, and Reels creators who post consistently."
      ctaLabel="Generate ideas free"
      ctaHref="/dashboard/tools/ideas"
      features={[
        { icon: '💡', title: 'Up to 30 Ideas at Once', desc: 'Generate 5, 10, 20, or 30 unique, niche-specific video ideas in a single click.' },
        { icon: '🎯', title: 'Niche-Specific', desc: 'Enter your niche or topic and get ideas tailored to your audience — not generic filler.' },
        { icon: '📈', title: 'Trending Formats', desc: 'Ideas are structured around proven short-form formats that drive views and follows.' },
        { icon: '🚀', title: 'Batch & Export', desc: 'Copy all ideas at once and build out your content calendar for the week.' },
      ]}
    />
  )
}
