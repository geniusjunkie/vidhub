import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateIdeas } from '@/lib/openai'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { niche, count } = await req.json()
  if (!niche) return NextResponse.json({ error: 'Niche is required' }, { status: 400 })

  const userId = (session.user as any).id
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.credits < 1) return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 })

  const ideas = await generateIdeas(niche, count || 10)

  await prisma.user.update({ where: { id: userId }, data: { credits: { decrement: 1 } } })

  return NextResponse.json({ ideas })
}
