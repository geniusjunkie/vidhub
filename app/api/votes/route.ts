import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  targetId: z.string(),
  targetType: z.enum(['post', 'question', 'answer']),
  value: z.number().int().min(-1).max(1),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  const body = schema.parse(await req.json())
  const { targetId, targetType, value } = body

  if (targetType === 'post') {
    if (value === 0) {
      await prisma.postVote.deleteMany({ where: { userId, postId: targetId } })
    } else {
      await prisma.postVote.upsert({
        where: { userId_postId: { userId, postId: targetId } },
        update: { value },
        create: { userId, postId: targetId, value },
      })
    }
  } else if (targetType === 'question') {
    if (value === 0) {
      await prisma.vote.deleteMany({ where: { userId, questionId: targetId } })
    } else {
      await prisma.vote.upsert({
        where: { userId_questionId: { userId, questionId: targetId } },
        update: { value },
        create: { userId, questionId: targetId, value },
      })
    }
  } else if (targetType === 'answer') {
    if (value === 0) {
      await prisma.answerVote.deleteMany({ where: { userId, answerId: targetId } })
    } else {
      await prisma.answerVote.upsert({
        where: { userId_answerId: { userId, answerId: targetId } },
        update: { value },
        create: { userId, answerId: targetId, value },
      })
    }
  }

  return NextResponse.json({ ok: true })
}
