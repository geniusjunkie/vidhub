import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  const answer = await prisma.answer.findUnique({
    where: { id: params.id },
    include: { question: true },
  })
  if (!answer) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (answer.question.authorId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.$transaction([
    prisma.answer.updateMany({ where: { questionId: answer.questionId }, data: { accepted: false } }),
    prisma.answer.update({ where: { id: params.id }, data: { accepted: true } }),
    prisma.question.update({ where: { id: answer.questionId }, data: { solved: true } }),
  ])

  return NextResponse.json({ ok: true })
}
