import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'placeholder', {
  apiVersion: '2025-02-24.acacia',
})

export const PLANS = {
  FREE:     { name: 'Free',     credits: 10,   videos: 3,   price: 0  },
  STARTER:  { name: 'Starter',  credits: 200,  videos: 30,  price: 25 },
  CREATOR:  { name: 'Creator',  credits: 500,  videos: 90,  price: 49 },
  BUSINESS: { name: 'Business', credits: 1200, videos: 200, price: 99 },
}

export async function createCheckoutSession(userId: string, plan: 'STARTER' | 'CREATOR' | 'BUSINESS', returnUrl: string) {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'placeholder') {
    return { url: '/dashboard?demo=payment' }
  }
  const priceId = {
    STARTER:  process.env.STRIPE_STARTER_PRICE_ID,
    CREATOR:  process.env.STRIPE_CREATOR_PRICE_ID,
    BUSINESS: process.env.STRIPE_BUSINESS_PRICE_ID,
  }[plan]

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${returnUrl}/dashboard?upgraded=true`,
    cancel_url: `${returnUrl}/pricing`,
    metadata: { userId, plan },
  })
  return { url: session.url }
}
