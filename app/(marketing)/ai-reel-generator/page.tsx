import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'AI Reel Generator — Create Instagram Reels with AI',
  description: 'Generate scripts, voiceovers, captions, and ideas for Instagram Reels with AI. Create more content in less time. Coming soon to VidHub.',
}

export default function Page() {
  return (
    <ToolPage
      badge="AI Reel Generator"
      title="Generate Instagram Reels"
      titleHighlight="with AI"
      description="From idea to ready-to-post Reel in minutes. VidHub's AI handles the script, voiceover, captions, and editing — so you can focus on growing your audience."
      ctaLabel="Get early access"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '📸', title: 'Reel Script Generator', desc: 'AI writes punchy, engaging scripts optimized for Instagram Reels engagement and saves.' },
        { icon: '🎙️', title: 'AI Voiceover', desc: 'Add a professional AI voiceover to your Reel without recording a word.' },
        { icon: '✍️', title: 'Auto Captions', desc: 'Auto-generate styled captions synced to your audio for maximum accessibility and watch time.' },
        { icon: '✂️', title: 'Smart Clipping', desc: 'Automatically cut your footage to the best moments for a 15–60 second Reel.' },
      ]}
    />
  )
}
