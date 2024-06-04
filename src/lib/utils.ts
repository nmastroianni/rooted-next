import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrlSegments(url: string | null): string[] {
  // Check if the URL parameter is null
  if (url === null) {
    console.error('URL parameter is null.')
    return []
  }

  // Remove leading and trailing slashes and split the URL by '/'
  const segments = url.replace(/^\/|\/$/g, '').split('/')

  // Filter out any empty segments
  const filteredSegments = segments.filter((segment) => segment !== '')

  return filteredSegments
}
