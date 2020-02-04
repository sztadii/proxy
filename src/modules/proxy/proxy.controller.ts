import * as express from 'express'
import * as requestProxy from 'express-request-proxy'
import { decodeString, encodeString } from '../../helpers/security-helpers'

const router = express.Router()

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
