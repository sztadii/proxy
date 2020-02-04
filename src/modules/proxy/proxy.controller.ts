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
  const urlFromEnv = process.env.PROXY_URL
  const encodedUrlFromCookie = req.cookies[cookieKey]

  const hasAnyUrl = encodedUrlFromCookie || urlFromEnv

  if (!hasAnyUrl) {
    res.redirect('/template')
  }

  const urlFromCookie = decodeBase64(encodedUrlFromCookie)
  const requestedPath = urlFromEnv ? `${urlFromEnv}/*` : `${urlFromCookie}/*`

  // Please keep it, useful during errors
  console.log('urlFromEnv', urlFromEnv)
  console.log('urlFromCookie', urlFromCookie)
  console.log('requestedPath', requestedPath)
  console.log('---')

  return requestProxy({ url: requestedPath })(req, res, next)
})

export default router
