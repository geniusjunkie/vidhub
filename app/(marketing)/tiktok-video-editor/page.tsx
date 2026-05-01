import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'TikTok Video Editor — Edit TikToks with AI',
  description: 'Edit TikTok videos faster with AI. Auto-captions, voiceovers, scripts, and smart clipping — everything you need to grow on TikTok.',
}

export default function Page() {
  return (
    <ToolPage
      badge="TikTok Video Editor"
      title="Edit TikTok videos"
      titleHighlight="faster with AI"
      description="VidHub gives you all the AI tools to create, edit, and optimize TikTok videos — from script to captions to voiceover — without touching complex software."
      ctaLabel="Start editing free"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '🎵', title: 'TikTok Script Writer', desc: 'AI writes hooks and scripts tailored for TikTok\'s fast-paced, scroll-stopping format.' },
        { icon: '✍️', title: 'Auto Captions', desc: 'Styled captions that match TikTok aesthetics — bold text, dynamic colors, perfect timing.' },
        { icon: '✂️', title: 'Smart Trimming', desc: 'Cut dead air, silences, and filler automatically to keep your TikTok tight and engaging.' },
        { icon: '🎙️', title: 'AI Voiceover', desc: 'Add trending AI voices to your TikToks without recording yourself.' },
      ]}
    />
  )
}
