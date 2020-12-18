declare module 'express-request-proxy' {
  import { Request, Response, NextFunction } from 'express'

  type RequestProxyType = {
    url: string
  }

  function requestProxy(
    type: RequestProxyType
  ): (req: Request, res: Response, next: NextFunction) => void

  export default requestProxy
}
