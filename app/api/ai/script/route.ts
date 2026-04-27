import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateScript } from '@/lib/openai'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { topic, tone, duration } = await req.json()
  if (!topic) return NextResponse.json({ error: 'Topic is required' }, { status: 400 })

  const userId = (session.user as any).id
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.credits < 2) return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 })

  const script = await generateScript(topic, tone || 'Casual', duration || '30 seconds')

  await prisma.user.update({ where: { id: userId }, data: { credits: { decrement: 2 } } })
  await prisma.project.create({
    data: { userId, title: topic.slice(0, 80), tool: 'SCRIPT', status: 'COMPLETE', content: script },
  })

  return NextResponse.json({ script })
}
