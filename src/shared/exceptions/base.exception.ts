import { HttpException, HttpStatus } from '@nestjs/common'

type TErrorBaseException = {
  message: string
  meta?: Record<string, unknown>
  code?: number
}

export class BaseException extends HttpException {
  constructor(readonly error: TErrorBaseException) {
    super(error, error.code ? error.code : HttpStatus.BAD_REQUEST)
  }
}
