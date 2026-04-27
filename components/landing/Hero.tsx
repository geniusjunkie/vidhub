import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          AI-Powered Video Creation
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          Create short-form videos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
            with AI in seconds
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Auto-clip videos, generate voiceovers and captions with AI, edit on a timeline and export ready-to-post content for TikTok, Reels, and Shorts.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/register" className="btn-primary text-base px-8 py-3.5">
            Start for free →
          </Link>
          <Link href="/#features" className="btn-secondary text-base px-8 py-3.5">
            See all features
          </Link>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            10 free credits
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Cancel anytime
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-20 max-w-2xl mx-auto">
          {[
            { value: '4×', label: 'Faster creation' },
            { value: '10+', label: 'Hours saved weekly' },
            { value: '35+', label: 'AI voices' },
          ].map((s) => (
            <div key={s.label} className="card-dark p-6 glow">
              <div className="text-4xl font-black text-brand-400 mb-1">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
