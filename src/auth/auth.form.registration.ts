import { IsString } from 'class-validator';
import { IsUnique } from '../database/is-unique.validator';
import { IsPasswordStrong } from '../user/password-strength.validator';
import { User } from '../user/user.entity';

export class AuthFormRegistration {
  @IsString()
  @IsUnique({
    entityClass: User,
    message: 'This username has already been registered',
  })
  username: string;

  @IsPasswordStrong()
  password: string;
}
