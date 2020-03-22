import { IsString } from 'class-validator';
import { IsPasswordStrong } from '../user/password-strength.validator';

export class AuthFormRegistration {
  @IsString()
  username: string;

  @IsPasswordStrong()
  password: string;
}
