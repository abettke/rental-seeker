import { getRepository, Repository } from 'typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export interface UniqueConstraintOptions extends ValidationOptions {
  entityClass?: Function | string;
}

@ValidatorConstraint({ name: 'isUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const [entityClass = args.object.constructor]: any = args.constraints;
    const repo: Repository<any> = getRepository(entityClass);
    return await repo.count({ where: { [args.property]: value } }) <= 0;
  }

  defaultMessage?(): string {
    return '$property must be a unique value';
  }

}

export function IsUnique(validationOptions?: UniqueConstraintOptions): Function {
  return (object: Record<string, any>, propertyName: string): void =>  {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [validationOptions?.entityClass],
      validator: IsUniqueConstraint,
    });
  };
}
