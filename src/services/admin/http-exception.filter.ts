import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    console.log('Error request', exception.getResponse())
    console.log('Request url', request.url)
    console.log('Request body', request.body)

    const res = exception.getResponse() as Record<string, unknown>

    response.status(status).json({
      status: status,
      code: res.code,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
