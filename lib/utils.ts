import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function getAvatarUrl(name?: string | null, image?: string | null) {
  if (image) return image
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name ?? 'U')}&background=3b82f6&color=fff&size=128`
}
