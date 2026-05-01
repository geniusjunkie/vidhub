import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'Instagram Reels Editor — Edit Reels with AI',
  description: 'Edit Instagram Reels with AI-powered tools. Auto-captions, scripts, voiceovers, and smart clipping. Grow your Instagram faster.',
}

export default function Page() {
  return (
    <ToolPage
      badge="Instagram Reels Editor"
      title="Edit Instagram Reels"
      titleHighlight="with AI automation"
      description="Create polished Instagram Reels without the editing grind. VidHub's AI writes your script, generates captions, and clips your content — ready to post in minutes."
      ctaLabel="Start free"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '📸', title: 'Reels Script Writer', desc: 'AI crafts punchy, aesthetic-friendly scripts designed to perform on Instagram.' },
        { icon: '✍️', title: 'Styled Captions', desc: 'On-brand caption styles that complement your Reels aesthetic and increase watch time.' },
        { icon: '🎙️', title: 'Voiceover Generator', desc: 'Professional AI narration that keeps viewers engaged from the first second.' },
        { icon: '✂️', title: 'Auto-Trim & Reframe', desc: 'Trim your clips and reframe to 9:16 automatically, no cropping skills needed.' },
      ]}
    />
  )
}
