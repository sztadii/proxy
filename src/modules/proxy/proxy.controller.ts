import * as express from 'express'
import * as requestProxy from 'express-request-proxy'

const router = express.Router()

router.get(
  '*',
  (req, res, next) => {
    const { query: { url } } = req

    const { cookies: { proxyUrl: oldProxyUrl } } = req
    const requestedPath = oldProxyUrl ? `${oldProxyUrl}/*` : `${url}/*`

    if (url) {
      res.cookie('proxyUrl', url)
    }

    return requestProxy({ url: requestedPath })(req, res, next)
  }
)

export default router
