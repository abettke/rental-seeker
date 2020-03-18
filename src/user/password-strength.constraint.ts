import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import * as zxcvbn from 'zxcvbn';

@ValidatorConstraint({ name: 'isPasswordStrong' })
export class IsPasswordStrong implements ValidatorConstraintInterface {

  validate(password: string) {
    return zxcvbn(password).score >= 3;
  }

  defaultMessage() {
    return '$property strength is too weak.';
  }

}
