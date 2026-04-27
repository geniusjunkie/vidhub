import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const followerId = (session.user as any).id

  const formData = await req.formData()
  const targetId = formData.get('targetId') as string
  if (!targetId || targetId === followerId) return NextResponse.json({ error: 'Invalid' }, { status: 400 })

  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId: targetId } },
  })

  if (existing) {
    await prisma.follow.delete({ where: { followerId_followingId: { followerId, followingId: targetId } } })
  } else {
    await prisma.follow.create({ data: { followerId, followingId: targetId } })
  }

  const referer = req.headers.get('referer') ?? '/'
  return NextResponse.redirect(referer, { status: 303 })
}
