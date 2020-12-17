import express from 'express'
import { renderFormTemplate, proxyHandler } from './proxy.controller'

const router = express.Router()

router.get('/template', renderFormTemplate)
router.get('*', proxyHandler)

export default router
