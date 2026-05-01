import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'YouTube Shorts Editor — Edit Shorts with AI',
  description: 'Edit YouTube Shorts faster with AI tools. Auto-captions, voiceovers, clip detection, and script generation — all in one platform.',
}

export default function Page() {
  return (
    <ToolPage
      badge="YouTube Shorts Editor"
      title="Edit YouTube Shorts"
      titleHighlight="in minutes, not hours"
      description="VidHub is the easiest way to edit and optimize YouTube Shorts. AI handles scripts, captions, voiceovers, and clipping — you just approve and post."
      ctaLabel="Try free"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '▶️', title: 'Shorts Script Generator', desc: 'Write high-retention scripts with strong hooks and CTAs optimized for the Shorts format.' },
        { icon: '📝', title: 'Auto Captions', desc: 'Add accurate, styled captions that improve accessibility and boost average view duration.' },
        { icon: '✂️', title: 'Smart Clip Editor', desc: 'Trim silences, remove filler words, and cut to the best moments automatically.' },
        { icon: '📊', title: 'Thumbnail Generator', desc: 'AI generates eye-catching thumbnail options for every Short you create.' },
      ]}
    />
  )
}
