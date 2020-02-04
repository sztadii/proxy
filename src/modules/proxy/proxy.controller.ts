import * as express from 'express'
import * as requestProxy from 'express-request-proxy'
import * as path from 'path'
import { decodeString } from '../../helpers/security-helpers'

const router = express.Router()

router.get('/template', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/proxy.template.html'))
})

router.get('*', (req, res, next) => {
  const cookieKey = process.env.URL_COOKIE_KEY
  const url = req.cookies[cookieKey]

  if (!url) {
    res.redirect('/template')
  }

  const encodeUrl = decodeString(url)
  const requestedPath = `${encodeUrl}/*`

  return requestProxy({ url: requestedPath })(req, res, next)
})

export default router
