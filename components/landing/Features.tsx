const FEATURES = [
  {
    icon: '📝',
    title: 'AI Script Generator',
    desc: 'Generate high-converting scripts in seconds. Choose your tone, duration, and niche — get a ready-to-record script instantly.',
    href: '/tools/script',
  },
  {
    icon: '🎙️',
    title: 'AI Voiceover Generator',
    desc: '35+ natural human-like voices. Paste your script, pick a voice, and get a studio-quality voiceover in seconds.',
    href: '/tools/voiceover',
  },
  {
    icon: '🏆',
    title: 'Video Ranking',
    desc: 'Combine multiple videos and rank them for comparison-style content. Perfect for top lists and vs. videos.',
    href: '/tools/video-ranking',
  },
  {
    icon: '🎬',
    title: 'Video Commentary',
    desc: 'Convert scripts into full scenes automatically. Add commentary, reactions, and narration to any video clip.',
    href: '/tools/commentary',
  },
  {
    icon: '💡',
    title: 'Video Idea Generator',
    desc: 'Never run out of content ideas. Enter your niche and get dozens of viral-worthy video concepts with hooks.',
    href: '/tools/ideas',
  },
  {
    icon: '🖼️',
    title: 'AI Image Generator',
    desc: 'Create stunning 9:16 thumbnails and visual assets from text prompts. Optimised for short-form platforms.',
    href: '/tools/image',
  },
  {
    icon: '📄',
    title: 'Video Transcriber',
    desc: 'Upload any video and get an accurate transcript in minutes. Export as SRT, TXT, or use directly in your editor.',
    href: '/tools/transcriber',
  },
  {
    icon: '💬',
    title: 'Auto Captions',
    desc: 'AI-generated captions synced to your video. Customise fonts, colours, and animations for maximum retention.',
    href: '/tools/captions',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Everything you need to go{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
              viral
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            8 AI-powered tools in one platform. No switching between apps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-dark p-6 hover:border-brand-500/30 transition-colors group">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
