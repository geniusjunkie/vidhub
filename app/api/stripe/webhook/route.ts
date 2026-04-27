import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { PLANS } from '@/lib/stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_placeholder', { apiVersion: '2025-02-24.acacia' })

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) return NextResponse.json({ received: true })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const plan = session.metadata?.plan as keyof typeof PLANS

    if (userId && plan && PLANS[plan]) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan,
          credits: { increment: PLANS[plan].credits },
          stripeCustomerId: session.customer as string,
        },
      })
    }
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice
    const customerId = invoice.customer as string
    const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } })
    if (user) {
      const plan = user.plan as keyof typeof PLANS
      await prisma.user.update({ where: { id: user.id }, data: { credits: { increment: PLANS[plan]?.credits ?? 0 } } })
    }
  }

  return NextResponse.json({ received: true })
}
