import { clsx, type ClassValue } from 'clsx'
import slugify from 'slugify'
import { formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function createSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, trim: true })
}

export function timeAgo(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '…' : str
}

export function getAvatarUrl(name?: string | null, image?: string | null): string {
  if (image) return image
  const initials = encodeURIComponent(name ?? 'U')
  return `https://ui-avatars.com/api/?name=${initials}&background=6366f1&color=fff&size=128`
}
