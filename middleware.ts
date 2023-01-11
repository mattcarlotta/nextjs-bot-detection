import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const botAgents = ['adsbot-google', 'googlebot']

export function middleware({ headers }: NextRequest) {
  const userAgent = headers.get('user-agent') || ''
  const isBot = new RegExp(botAgents.join('|'), 'i').test(userAgent)

  const res = NextResponse.next({
    request: { headers: new Headers(headers) }
  })

  res.headers.set('x-user-agent', isBot ? 'bot' : 'user')

  return res
}
