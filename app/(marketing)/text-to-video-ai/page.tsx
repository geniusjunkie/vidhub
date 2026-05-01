import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'Text to Video AI — Turn Text into Videos Automatically',
  description: 'Convert text, blog posts, or scripts into short-form videos with AI. VidHub generates voiceovers, captions, and visuals from your text.',
}

export default function Page() {
  return (
    <ToolPage
      badge="Text to Video AI"
      title="Turn any text into"
      titleHighlight="a ready-to-post video"
      description="Paste a script, blog post, or idea and let VidHub transform it into a complete short-form video — with voiceover, captions, and visuals — automatically."
      ctaLabel="Get early access"
      ctaHref="/register"
      comingSoon
      features={[
        { icon: '📝', title: 'Paste Any Text', desc: 'Blog posts, scripts, tweets, or ideas — VidHub converts any text format into video content.' },
        { icon: '🎙️', title: 'AI Voiceover', desc: 'Your text is automatically read by a natural-sounding AI voice matched to your content style.' },
        { icon: '✍️', title: 'Auto Captions', desc: 'Captions are generated and styled automatically, synced perfectly to the voiceover.' },
        { icon: '🖼️', title: 'AI Visuals', desc: 'AI generates or suggests relevant visuals and B-roll to complement your text content.' },
      ]}
    />
  )
}
