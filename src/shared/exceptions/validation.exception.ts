import { HttpException, HttpStatus } from '@nestjs/common'

export class ValidationException extends HttpException {
  constructor(readonly error: { message: string; errors?: Record<string, unknown> }) {
    super(error, HttpStatus.NOT_ACCEPTABLE)
  }
}
