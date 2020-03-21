import * as bcrypt from 'bcrypt';
import { IsEnum, IsString } from 'class-validator';
import { IsPasswordStrong } from './password-strength.validator';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ROLES } from '../auth/auth.constants.roles';

@Entity()
export class User {

  constructor(initial?: Partial<User>) {
    Object.assign(this, initial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column()
  @IsPasswordStrong({ always: true })
  password: string;

  @Column({ default: ROLES.CLIENT })
  @IsEnum(ROLES)
  role: ROLES;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if(this.password){
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
