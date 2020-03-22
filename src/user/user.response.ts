import { Exclude } from 'class-transformer';
import { User } from './user.entity';

export class UserResponse extends User {
  @Exclude()
  password: string;
}
