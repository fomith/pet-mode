import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import basicAuth from 'express-basic-auth'
import { AppModule } from './app.module'
import { AdminModule } from './services/admin/admin.module'
import { ValidationException } from './shared/exceptions/validation.exception'
import { buildValidationError } from './shared/pipes/validation.pipe'

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 5001
    const app = await NestFactory.create(AppModule)

    app.enableCors()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        exceptionFactory: (errors) => {
          if (errors.length)
            throw new ValidationException({
              message: 'Validation request failed',
              errors: buildValidationError(errors),
            })
        },
      }),
    )

    if (process.env.NODE_ENV === 'dev') {
      if (process.env.SWAGGER_USER && process.env.SWAGGER_PASSWORD) {
        app.use(
          ['/api/admin'],
          basicAuth({
            challenge: true,
            users: {
              [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
            },
          }),
        )
      }

      /* MAIN DOCUMENT  */
      const mainConfig = new DocumentBuilder().setTitle('Missis Laser').setVersion('1.0').build()
      const mainDocument = SwaggerModule.createDocument(app, mainConfig, {
        include: [],
      })
      SwaggerModule.setup('api', app, mainDocument)

      /* ADMIN DOCUMENT  */
      const adminConfig = new DocumentBuilder()
        .setTitle('Missis Laser (For ADMINS)')
        .setDescription(
          'All Private Route for authiticated users. В запросах ВСЕГДА необходимо передавать username и password для авторизации. Аккаунт совпадающий с этими данными должен иметь тип пользователя ADMIN',
        )
        .addSecurity('basic', { type: 'http', scheme: 'basic' })
        .setVersion('1.0')
        .build()
      const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
        include: [AdminModule],
      })
      SwaggerModule.setup('api/admin', app, adminDocument)
    }

    await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

bootstrap()
