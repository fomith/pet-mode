/* eslint-disable @typescript-eslint/ban-types */

import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common'
import { validate, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { ValidationException } from '../exceptions/validation.exception'
import { Dict } from '../utilityTypes'

export const buildValidationError = (errors: ValidationError[]) => {
  const result: Dict<any> = {}

  const writeErrors = ({ property, constraints }: ValidationError) => {
    if (constraints) {
      result[property] = Object.values(constraints)
    }
  }

  errors.forEach((error) => {
    if (error.children && error.children.length) {
      result[error.property] = buildValidationError(error.children)
    } else {
      errors.forEach(writeErrors)
    }
  })

  return result
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted')
    }

    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object)

    if (errors.length > 0) {
      throw new ValidationException({ message: 'Input data validation failed', errors: buildValidationError(errors) })
    }

    return value
  }

  private toValidate(metatype: Function): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find((type) => metatype === type)
  }
}
