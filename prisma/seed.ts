import { PrismaClient } from '@prisma/client'
import { createSlug } from '../lib/utils'

const prisma = new PrismaClient()

const TAGS = [
  { name: 'javascript', color: '#f7df1e', description: 'The language of the web' },
  { name: 'typescript', color: '#3178c6', description: 'Typed JavaScript' },
  { name: 'react', color: '#61dafb', description: 'UI component library by Meta' },
  { name: 'nextjs', color: '#000000', description: 'React framework for production' },
  { name: 'python', color: '#3776ab', description: 'General-purpose language' },
  { name: 'nodejs', color: '#68a063', description: 'Server-side JavaScript runtime' },
  { name: 'css', color: '#1572b6', description: 'Cascading Style Sheets' },
  { name: 'docker', color: '#2496ed', description: 'Container platform' },
  { name: 'database', color: '#336791', description: 'Data storage and retrieval' },
  { name: 'devops', color: '#e95420', description: 'Development operations & CI/CD' },
]

async function main() {
  console.log('Seeding tags…')
  for (const tag of TAGS) {
    await prisma.tag.upsert({
      where: { slug: createSlug(tag.name) },
      update: {},
      create: { name: tag.name, slug: createSlug(tag.name), color: tag.color, description: tag.description },
    })
  }
  console.log('Done!')
}

main().finally(() => prisma.$disconnect())
