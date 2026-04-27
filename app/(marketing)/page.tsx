import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Pricing from '@/components/landing/Pricing'
import Reviews from '@/components/landing/Reviews'
import FAQ from '@/components/landing/FAQ'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Reviews />
      <Pricing />
      <FAQ />
      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to create faster?
          </h2>
          <p className="text-gray-400 text-lg mb-8">Start free. No credit card required.</p>
          <Link href="/register" className="btn-primary text-base px-10 py-4">
            Get started for free →
          </Link>
        </div>
      </section>
    </main>
  )
}
