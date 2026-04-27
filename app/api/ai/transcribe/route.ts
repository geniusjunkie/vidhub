import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { transcribeAudio } from '@/lib/openai'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

  const userId = (session.user as any).id
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.credits < 5) return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 })

  const transcript = await transcribeAudio(url)

  await prisma.user.update({ where: { id: userId }, data: { credits: { decrement: 5 } } })
  await prisma.project.create({
    data: { userId, title: url.slice(0, 80), tool: 'TRANSCRIBER', status: 'COMPLETE', content: transcript },
  })

  return NextResponse.json({ transcript })
}
