import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'AI Thumbnail Maker — Generate Click-Worthy Thumbnails',
  description: 'Generate high-converting thumbnails for YouTube, TikTok, and Reels with AI. Eye-catching designs in seconds — no Photoshop needed.',
}

export default function Page() {
  return (
    <ToolPage
      badge="AI Thumbnail Maker"
      title="Generate thumbnails that"
      titleHighlight="actually get clicks"
      description="Stop losing views to bad thumbnails. VidHub's AI generates scroll-stopping thumbnail options based on your video topic — bold text, striking visuals, proven layouts."
      ctaLabel="Get early access"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '🖼️', title: 'AI Image Generation', desc: 'Generate cinematic, high-quality thumbnail images from a text prompt in seconds.' },
        { icon: '✏️', title: 'Bold Text Overlays', desc: 'AI adds high-contrast, readable title text using layouts proven to increase CTR.' },
        { icon: '🎨', title: '7 Visual Styles', desc: 'Photorealistic, cinematic, anime, neon, minimalist — match your brand aesthetic.' },
        { icon: '📐', title: 'Right Size, Every Time', desc: 'Export in the exact dimensions required by YouTube, TikTok, and Instagram.' },
      ]}
    />
  )
}
