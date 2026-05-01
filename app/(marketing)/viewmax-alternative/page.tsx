import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'Best Viewmax Alternative — VidHub vs Viewmax.io',
  description: 'Looking for a Viewmax.io alternative? VidHub offers more AI tools, better pricing, and no watermarks. Scripts, voiceovers, captions, and more. Free to try.',
}

export default function Page() {
  return (
    <ToolPage
      badge="Viewmax Alternative"
      title="The smarter alternative"
      titleHighlight="to Viewmax.io"
      description="VidHub gives you a full AI content creation suite — scripts, voiceovers, image generation, captions, and more — all at creator-friendly pricing."
      ctaLabel="Try VidHub free"
      ctaHref="/register"
      compareWith="Viewmax.io"
      comparisons={[
        { feature: 'AI Script Generator', us: true, them: true },
        { feature: 'AI Voiceover', us: true, them: true },
        { feature: 'Video Idea Generator', us: true, them: false },
        { feature: 'Auto Captions', us: true, them: true },
        { feature: 'AI Image Generator', us: true, them: false },
        { feature: 'Video Transcriber', us: true, them: false },
        { feature: 'Free plan available', us: true, them: false },
        { feature: 'No watermark on free plan', us: true, them: false },
        { feature: 'GitHub & Google login', us: true, them: false },
      ]}
      features={[
        { icon: '🎯', title: 'All-in-One Platform', desc: 'Script, voiceover, captions, ideas, and images — everything in one dashboard.' },
        { icon: '💸', title: 'Fairer Pricing', desc: 'Credit-based pricing means you only pay for what you use. No bloated subscriptions.' },
        { icon: '🔒', title: 'No Lock-In', desc: 'Export your content freely. No watermarks on any plan, no hidden limits.' },
        { icon: '⚡', title: 'Faster Results', desc: 'Optimized AI pipelines that generate scripts, voiceovers, and ideas in seconds.' },
      ]}
    />
  )
}
