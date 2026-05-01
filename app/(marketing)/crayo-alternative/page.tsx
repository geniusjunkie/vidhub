import { Metadata } from 'next'
import ToolPage from '@/components/landing/ToolPage'

export const metadata: Metadata = {
  title: 'Best Crayo Alternative — VidHub vs Crayo.ai',
  description: 'Looking for a Crayo alternative? VidHub offers AI script generation, voiceovers, auto-captions, and idea generation at a fraction of the cost. Free to try.',
}

export default function Page() {
  return (
    <ToolPage
      badge="Crayo Alternative"
      title="The better alternative"
      titleHighlight="to Crayo.ai"
      description="VidHub gives you everything Crayo offers — scripts, voiceovers, captions, and ideas — plus more AI tools, more voices, and better pricing. No compromises."
      ctaLabel="Try VidHub free"
      ctaHref="/register"
      compareWith="Crayo.ai"
      comparisons={[
        { feature: 'AI Script Generator', us: true, them: true },
        { feature: 'AI Voiceover (35+ voices)', us: true, them: false },
        { feature: 'Video Idea Generator', us: true, them: true },
        { feature: 'Auto Captions', us: true, them: true },
        { feature: 'AI Image Generator', us: true, them: false },
        { feature: 'Video Transcriber', us: true, them: false },
        { feature: 'Commentary Generator', us: true, them: false },
        { feature: 'Free plan available', us: true, them: false },
        { feature: 'No watermark on free plan', us: true, them: false },
      ]}
      features={[
        { icon: '💰', title: 'Better Value', desc: 'More AI tools for less money. VidHub\'s free plan includes 10 credits — no card required.' },
        { icon: '🎙️', title: 'More Voices', desc: '35+ AI voices vs Crayo\'s limited selection. Find the perfect voice for every video.' },
        { icon: '🛠️', title: 'More Tools', desc: 'Image generation, transcription, and commentary tools that Crayo doesn\'t offer.' },
        { icon: '🚀', title: 'Faster & Simpler', desc: 'Clean, distraction-free UI built for creators who want results, not complexity.' },
      ]}
    />
  )
}
