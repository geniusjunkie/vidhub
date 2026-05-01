import Link from 'next/link'

interface Feature {
  icon: string
  title: string
  desc: string
}

interface ToolPageProps {
  badge: string
  title: string
  titleHighlight: string
  description: string
  features: Feature[]
  ctaLabel: string
  ctaHref: string
  comingSoon?: boolean
  compareWith?: string
  comparisons?: { feature: string; us: boolean; them: boolean }[]
}

export default function ToolPage({
  badge,
  title,
  titleHighlight,
  description,
  features,
  ctaLabel,
  ctaHref,
  comingSoon,
  compareWith,
  comparisons,
}: ToolPageProps) {
  return (
    <main className="bg-dark-900 min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            {badge}
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            {title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
              {titleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {comingSoon ? (
              <>
                <Link href="/register" className="btn-primary text-base px-8 py-3.5">
                  Get early access →
                </Link>
                <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium">
                  Coming soon
                </span>
              </>
            ) : (
              <>
                <Link href={ctaHref} className="btn-primary text-base px-8 py-3.5">
                  {ctaLabel} →
                </Link>
                <Link href="/pricing" className="btn-secondary text-base px-8 py-3.5">
                  See pricing
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-500">
            {['No credit card required', '10 free credits', 'Cancel anytime'].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Everything you need</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card-dark p-6 flex gap-4">
              <span className="text-3xl flex-shrink-0">{f.icon}</span>
              <div>
                <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table (for alternative pages) */}
      {compareWith && comparisons && (
        <section className="py-20 bg-dark-800/50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              VidHub vs {compareWith}
            </h2>
            <div className="card-dark overflow-hidden">
              <div className="grid grid-cols-3 text-sm font-semibold border-b border-white/5 p-4">
                <span className="text-gray-400">Feature</span>
                <span className="text-brand-400 text-center">VidHub</span>
                <span className="text-gray-400 text-center">{compareWith}</span>
              </div>
              {comparisons.map((row, i) => (
                <div key={i} className="grid grid-cols-3 text-sm p-4 border-b border-white/5 last:border-0">
                  <span className="text-gray-300">{row.feature}</span>
                  <span className="text-center">{row.us ? '✅' : '❌'}</span>
                  <span className="text-center">{row.them ? '✅' : '❌'}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-black text-white mb-4">Ready to create faster?</h2>
          <p className="text-gray-400 mb-8">Join thousands of creators already using VidHub.</p>
          <Link href="/register" className="btn-primary text-base px-10 py-4">
            Start free — no card needed →
          </Link>
        </div>
      </section>
    </main>
  )
}
