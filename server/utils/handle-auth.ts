import type { H3Event } from 'h3'
import { resultUnauthorized } from './handle-response'
import jwt from 'jsonwebtoken'

export function handleAuth(event: H3Event) {
  const headers = getHeaders(event)
  const authorizationHeader = headers.authorization

  const headerToken = authorizationHeader?.split(' ')[1]
  const cookieToken = getCookie(event, 'access_token')

  if (!headerToken || !cookieToken) {
    event.context.auth = undefined
    throw resultUnauthorized()
  }

  jwt.verify(headerToken, process.env.JWT_SECRET_KEY || 'SECRET_KEY', (error: any, decoded: any) => {
    if (error) throw resultUnauthorized()
    event.context.auth = decoded
  })
}