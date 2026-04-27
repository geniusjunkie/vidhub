import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateVoiceover } from '@/lib/elevenlabs'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { text, voiceId } = await req.json()
  if (!text) return NextResponse.json({ error: 'Text is required' }, { status: 400 })

  const userId = (session.user as any).id
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.credits < 3) return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 })

  const audioUrl = await generateVoiceover(text, voiceId)

  await prisma.user.update({ where: { id: userId }, data: { credits: { decrement: 3 } } })
  await prisma.project.create({
    data: { userId, title: text.slice(0, 80), tool: 'VOICEOVER', status: 'COMPLETE', content: audioUrl },
  })

  return NextResponse.json({ audioUrl })
}
