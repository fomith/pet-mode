import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ValidationException } from '../exceptions/validation.exception'

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const statusCode = HttpStatus.NOT_ACCEPTABLE

    const errorResponse = { success: false, message: exception.message }

    if (exception instanceof ValidationException && exception.error.errors) {
      Object.assign(errorResponse, { errors: exception.error.errors })
    }

    response.status(statusCode).json(errorResponse)
  }
}
