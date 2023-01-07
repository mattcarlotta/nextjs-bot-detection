import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const botAgents = ['adsbot-google', 'googlebot']

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''

  const isBot = new RegExp(botAgents.join('|'), 'i').test(userAgent)

  const response = NextResponse.next()

  response.headers.append('x-user-agent', isBot ? 'bot' : 'user')

  return response
}
