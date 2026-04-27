import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import PostEditor from '@/components/PostEditor'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Write Article' }

export default async function NewPostPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Write an Article</h1>
      <PostEditor />
    </div>
  )
}
