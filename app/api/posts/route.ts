import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(10),
  excerpt: z.string().max(300).optional(),
  tags: z.array(z.string()).max(5).optional(),
  published: z.boolean().optional(),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  try {
    const body = schema.parse(await req.json())
    let slug = createSlug(body.title)

    // Ensure unique slug
    const existing = await prisma.post.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${Date.now()}`

    // Upsert tags
    const tagRecords = await Promise.all(
      (body.tags ?? []).map(async (name) => {
        const tagSlug = createSlug(name)
        return prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: { name: name.toLowerCase(), slug: tagSlug },
        })
      })
    )

    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt,
        published: body.published ?? false,
        authorId: userId,
        tags: { create: tagRecords.map((t) => ({ tagId: t.id })) },
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = 15

  const posts = await prisma.post.findMany({
    where: { published: true },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, name: true, image: true } },
      tags: { include: { tag: true } },
      _count: { select: { votes: true, comments: true } },
    },
  })

  return NextResponse.json(posts)
}
