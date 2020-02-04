import express from 'express'
import requestProxy from 'express-request-proxy'
import path from 'path'
import { decodeBase64 } from '../../helpers/security-helpers'

const router = express.Router()

router.get('/template', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/proxy.template.html'))
})

router.get('*', (req, res, next) => {
  const cookieKey = process.env.URL_COOKIE_KEY
  const proxyUrl = process.env.PROXY_URL
  const url = req.cookies[cookieKey]

  if (!url && !proxyUrl) {
    res.redirect('/template')
  }

  const encodeUrl = decodeBase64(url)
  const requestedPath = proxyUrl ? `${proxyUrl}/*` : `${encodeUrl}/*`

  // Please keep it, useful during errors
  console.log('encodeUrl', encodeUrl)
  console.log('requestedPath', requestedPath)

  return requestProxy({ url: requestedPath })(req, res, next)
})

export default router
