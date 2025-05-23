import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'NotPaseDate', async: false })
@Injectable()
export class NotPasteDate implements ValidatorConstraintInterface {
  validate(value: Date, args: ValidationArguments) {
    if (!(value instanceof Date)) return false;
    const now = new Date();
    return value.getTime() >= now.getTime();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be valid and not in the past`;
  }
}

export function IsNotPasteDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotPasteDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: NotPasteDate,
    });
  };
}
