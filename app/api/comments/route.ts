import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  content: z.string().min(1).max(1000),
  targetId: z.string(),
  targetType: z.enum(['post', 'question']),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  const body = schema.parse(await req.json())

  const comment = await prisma.comment.create({
    data: {
      content: body.content,
      authorId: userId,
      ...(body.targetType === 'post' ? { postId: body.targetId } : { questionId: body.targetId }),
    },
    include: { author: { select: { id: true, name: true, image: true } } },
  })

  return NextResponse.json(comment, { status: 201 })
}
