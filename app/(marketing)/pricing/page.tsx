import Pricing from '@/components/landing/Pricing'
import Link from 'next/link'

export const metadata = { title: 'Pricing — VidHub' }

export default function PricingPage() {
  return (
    <main>
      <div className="pt-24 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Simple, transparent pricing</h1>
        <p className="text-gray-400 text-lg">Start free. Scale as you grow.</p>
      </div>
      <Pricing />
      <div className="text-center pb-16">
        <p className="text-gray-500 text-sm">Questions? <Link href="mailto:support@vidhub.ai" className="text-brand-400 hover:text-brand-300">Contact us</Link></p>
      </div>
    </main>
  )
}
