import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model, ModelCtor } from "sequelize-typescript";


@ValidatorConstraint({ name: 'UniqueVal', async: true })
@Injectable()
export class UniqueVal implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      return false;
    }

    const model: ModelCtor<Model> = args.constraints[0];
    const val = await model.findOne({ where: { [args.property]: value } });
    return !val
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} already exists or is null`;
  }
}

export function IsUnique(model: ModelCtor<Model>, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model],
      options: validationOptions,
      validator: UniqueVal,
    });
  };
}