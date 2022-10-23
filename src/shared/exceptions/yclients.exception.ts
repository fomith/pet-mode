import { HttpException, HttpStatus } from '@nestjs/common'

export class YClientsException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_ACCEPTABLE)
  }
}
