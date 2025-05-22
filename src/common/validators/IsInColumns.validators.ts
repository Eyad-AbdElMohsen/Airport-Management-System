import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model, ModelCtor } from 'sequelize-typescript';

@ValidatorConstraint({ name: 'InColumns', async: false })
@Injectable()
export class InColumns implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const model: ModelCtor<Model> = args.constraints[0];
    const columns: string[] = Object.keys(model.getAttributes());

    //for sort
    if (typeof value === 'string') {
      const values: string[] = value
        .split(',')
        .map((field) => field.replace(/^[-]/, ''));
      return values.every((val) => columns.includes(val));
    }

    //for filters
    if (typeof value === 'object') {
      const keys = Object.keys(value);
      return keys.every((key) => columns.includes(key));
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const model: ModelCtor<Model> = args.constraints[0];
    const columns: string[] = Object.keys(model.getAttributes());
    return `Invalid ${args.property}. Allowed fields: ${columns.join(', ')}`;
  }
}

export function IsInColumns(
  model: ModelCtor<Model>,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isInColumns',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model],
      options: validationOptions,
      validator: InColumns,
    });
  };
}
