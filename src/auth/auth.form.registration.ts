import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from '../database/is-unique.validator';
import { IsPasswordStrong } from '../user/password-strength.validator';
import { User } from '../user/user.entity';

export class AuthFormRegistration {
  @IsUnique({
    entityClass: User,
    message: 'This username has already been registered',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsPasswordStrong()
  @IsString()
  password: string;
}
