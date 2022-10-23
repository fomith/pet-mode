import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { ValidationException } from '../exceptions/validation.exception'

@Injectable()
export class ArrayOfNumbersQueryPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const array = value.split(',')

    if (!metadata.data || metadata.type !== 'query' || !Array.isArray(array)) {
      return []
    }

    return array.map((value) => {
      const maybeNumber = Number(value)
      if (maybeNumber) {
        return maybeNumber
      }

      throw new ValidationException({ message: 'array is bad' })
    })
  }
}
