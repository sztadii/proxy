import app from './app'
import * as dotenv from 'dotenv'

dotenv.config()

async function startServer() {
  const port = process.env.PORT

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log('--------------------')
  })
}

startServer()
