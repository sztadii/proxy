import * as express from 'express'
import * as requestProxy from 'express-request-proxy'

const router = express.Router()

function encodeString(text: string): string {
  return Buffer.from(text).toString('base64')
}

function decodeString(text: string): string {
  return Buffer.from(text, 'base64').toString('ascii')
}

router.get('*', (req, res, next) => {
  const { url } = req.query
  const cookieKey = process.env.OLD_URL_COOKIE_KEY
  const oldUrl = req.cookies[cookieKey]

  const encodeUrl = oldUrl && decodeString(oldUrl)
  const requestedPath = encodeUrl && !url ? `${encodeUrl}/*` : `${url}/*`

  if (url) {
    const encodeUrl = encodeString(url)
    res.cookie(cookieKey, encodeUrl)
  }

  return requestProxy({ url: requestedPath })(req, res, next)
})

export default router
