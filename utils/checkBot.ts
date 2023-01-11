import type { OutgoingHttpHeaders } from 'http2'

export default function checkBot(headers: OutgoingHttpHeaders) {
  return headers['x-user-agent'] === 'bot'
}
