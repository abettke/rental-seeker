import * as zxcvbn from 'zxcvbn';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions
} from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordStrong' })
export class IsPasswordStrongConstraint implements ValidatorConstraintInterface {

  validate(password: string) {
    return zxcvbn(password).score >= 3;
  }

  defaultMessage() {
    return '$property strength is too weak.';
  }

}

export function IsPasswordStrong(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordStrongConstraint
    });
  };
}
