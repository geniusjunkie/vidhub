'use client'
import { useState } from 'react'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    credits: 10,
    videos: 3,
    features: ['3 videos/month', '10 credits', 'Basic AI tools', 'Standard export', 'Community support'],
    cta: 'Get started free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Starter',
    price: { monthly: 25, annual: 12 },
    credits: 200,
    videos: 30,
    features: ['30 videos/month', '200 credits', 'All AI tools', 'Fast mode', '35+ AI voices', 'Auto captions', 'Priority support'],
    cta: 'Start Starter',
    href: '/register?plan=starter',
    highlight: false,
  },
  {
    name: 'Creator',
    price: { monthly: 49, annual: 24 },
    credits: 500,
    videos: 90,
    features: ['90 videos/month', '500 credits', 'All AI tools', 'Fast + Pro + Cinematic modes', 'Brand kits', 'Priority rendering', 'Analytics'],
    cta: 'Start Creating',
    href: '/register?plan=creator',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: { monthly: 99, annual: 49 },
    credits: 1200,
    videos: 200,
    features: ['200 videos/month', '1,200 credits', 'All modes unlocked', 'Team access', 'Commercial rights', 'Advanced analytics', 'Dedicated support'],
    cta: 'Start Business',
    href: '/register?plan=business',
    highlight: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-400 text-lg mb-8">Start free. Scale when you&apos;re ready.</p>

          <div className="inline-flex items-center gap-3 bg-dark-800 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${!annual ? 'bg-brand-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${annual ? 'bg-brand-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Annual
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">50% OFF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative card-dark p-6 flex flex-col ${plan.highlight ? 'border-brand-500/50 ring-1 ring-brand-500/30' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold">{plan.badge}</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-bold text-white text-lg mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white">${annual ? plan.price.annual : plan.price.monthly}</span>
                  {plan.price.monthly > 0 && <span className="text-gray-400 mb-1">/mo</span>}
                </div>
                {annual && plan.price.monthly > 0 && (
                  <p className="text-xs text-green-400 mt-1">Billed annually · Save ${(plan.price.monthly - plan.price.annual) * 12}/yr</p>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-brand-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={plan.highlight ? 'btn-primary justify-center' : 'btn-secondary justify-center'}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
