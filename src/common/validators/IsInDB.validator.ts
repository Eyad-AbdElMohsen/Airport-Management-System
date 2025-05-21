import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model, ModelCtor } from 'sequelize-typescript';

@ValidatorConstraint({ name: 'ExistInDB', async: true })
@Injectable()
export class ExistInDB implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      return false;
    }

    const model: ModelCtor<Model> = args.constraints[0];
    const existance = await model.findByPk(Number(value));
    return !!existance;
  }

  defaultMessage(args: ValidationArguments) {
    return `This ${args.property} is already used or is null`;
  }
}

export function IsExistInDB(
  model: ModelCtor<Model>,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isExistInDB',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model],
      options: validationOptions,
      validator: ExistInDB,
    });
  };
}
