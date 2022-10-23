import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule as CronModule } from '@nestjs/schedule'
import { APP_FILTER } from '@nestjs/core'
import { AdminModule } from './services/admin/admin.module'

import { AllExceptionsFilter } from './shared/filtres/all-exception.filter'
import { Maybe } from './shared/utilityTypes'

const NODE_ENV = process.env.NODE_ENV as Maybe<'prod' | 'dev'>
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: NODE_ENV == null ? '.env.dev' : `.env.${NODE_ENV}` }),
    CronModule.forRoot(),
    MongooseModule.forRoot(String(process.env.MONGO_CONNECTION_URL), { useFindAndModify: false, useCreateIndex: true }),
    AdminModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
