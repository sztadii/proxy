import { Request, Response, NextFunction } from 'express'
import requestProxy from 'express-request-proxy'
import path from 'path'
import { decodeBase64 } from '../../helpers/security-helpers'

export function renderFormTemplate(req: Request, res: Response): void {
  res.sendFile(path.join(__dirname + '/proxy.template.html'))
}

export function proxyHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const cookieKey = 'proxy-url'
  const urlFromEnv = process.env.PROXY_URL
  const encodedUrlFromCookie = req.cookies[cookieKey]

  const hasAnyUrl = encodedUrlFromCookie || urlFromEnv

  if (!hasAnyUrl) {
    return res.redirect('/template')
  }

  const urlFromCookie = decodeBase64(encodedUrlFromCookie)
  const requestedPath = urlFromEnv ? `${urlFromEnv}/*` : `${urlFromCookie}/*`

  // Please keep it, useful during debugging
  console.log({ urlFromEnv })
  console.log({ urlFromCookie })
  console.log({ requestedPath })
  console.log('---')

  return requestProxy({ url: requestedPath })(req, res, next)
}
