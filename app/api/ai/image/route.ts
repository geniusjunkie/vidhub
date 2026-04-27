import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateImage } from '@/lib/replicate'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { prompt } = await req.json()
  if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })

  const userId = (session.user as any).id
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.credits < 4) return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 })

  const imageUrl = await generateImage(prompt)

  await prisma.user.update({ where: { id: userId }, data: { credits: { decrement: 4 } } })
  await prisma.project.create({
    data: { userId, title: prompt.slice(0, 80), tool: 'IMAGE', status: 'COMPLETE', content: imageUrl },
  })

  return NextResponse.json({ imageUrl })
}
