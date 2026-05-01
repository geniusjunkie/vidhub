import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'AI Highlight Video Maker — Auto-Generate Highlight Reels',
  description: 'Automatically create highlight videos from your long-form content with AI. Perfect for gaming, sports, podcasts, and events.',
}

export default function Page() {
  return (
    <ToolPage
      badge="AI Highlight Maker"
      title="Auto-generate highlight reels"
      titleHighlight="from any video"
      description="Upload a long video and VidHub's AI finds the most exciting, engaging moments — then stitches them into a polished highlight reel ready to share."
      ctaLabel="Get early access"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '🏆', title: 'Auto Highlight Detection', desc: 'AI identifies peak moments — crowd reactions, key plays, big laughs, or emotional peaks.' },
        { icon: '🎬', title: 'Smart Sequencing', desc: 'Highlights are stitched together in a compelling order that tells a story.' },
        { icon: '🎵', title: 'Background Music', desc: 'AI matches your highlight reel with the right background music to boost emotional impact.' },
        { icon: '📐', title: 'Multi-Format Export', desc: 'Export your highlight reel in landscape, portrait, or square — for every platform at once.' },
      ]}
    />
  )
}
