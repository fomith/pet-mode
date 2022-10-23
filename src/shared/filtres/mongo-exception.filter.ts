import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'

import { MongoError } from 'mongodb'

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const statusCode = HttpStatus.CONFLICT

    const errorResponse = { success: false, message: exception.message }

    if (exception instanceof MongoError) {
      switch (exception.code) {
        case 11000: {
          errorResponse.message = 'Duplicate key in collection'
        }
      }
    }

    response.status(statusCode).json(errorResponse)
  }
}
