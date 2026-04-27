import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(10).max(200),
  content: z.string().min(20),
  tags: z.array(z.string()).max(5).optional(),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  try {
    const body = schema.parse(await req.json())

    const tagRecords = await Promise.all(
      (body.tags ?? []).map(async (name) => {
        const slug = createSlug(name)
        return prisma.tag.upsert({
          where: { slug },
          update: {},
          create: { name: name.toLowerCase(), slug },
        })
      })
    )

    const question = await prisma.question.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        tags: { create: tagRecords.map((t) => ({ tagId: t.id })) },
      },
    })

    return NextResponse.json(question, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
