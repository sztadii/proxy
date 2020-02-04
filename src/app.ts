import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import proxy from './modules/proxy/proxy.controller'
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())

app.use('/', proxy)

export default app
