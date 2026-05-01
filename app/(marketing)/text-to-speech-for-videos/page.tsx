import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'Text to Speech for Videos — AI Voice Generator',
  description: 'Convert text to speech for your videos instantly. Professional AI voices for TikTok, YouTube Shorts, and Instagram Reels. Free to try.',
}

export default function Page() {
  return (
    <ToolPage
      badge="Text to Speech"
      title="Convert text to speech"
      titleHighlight="for any video"
      description="The fastest way to add a professional voiceover to your videos. Type your script, pick a voice, and download your audio — no editing skills required."
      ctaLabel="Try text to speech free"
      ctaHref="/dashboard/tools/voiceover"
      features={[
        { icon: '📝', title: 'Paste Any Text', desc: 'Paste scripts, captions, or blog posts and convert them to natural-sounding speech instantly.' },
        { icon: '🌍', title: 'Multiple Languages', desc: 'Generate voiceovers in English, Spanish, French, German, and more.' },
        { icon: '🎚️', title: 'Adjustable Speed & Tone', desc: 'Control speaking pace and emotional tone to match your video content.' },
        { icon: '💾', title: 'Instant Download', desc: 'Download your audio as MP3 and drop it straight into your video editor.' },
      ]}
    />
  )
}
