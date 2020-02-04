import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import proxy from './modules/proxy/proxy.controller'
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())

app.use('/', proxy)

export default app
