import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan } = await req.json()
  const userId = (session.user as any).id
  const origin = req.headers.get('origin') || 'http://localhost:3000'

  const result = await createCheckoutSession(userId, plan, origin)
  return NextResponse.json(result)
}
