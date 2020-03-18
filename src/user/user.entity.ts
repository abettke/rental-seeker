import * as bcrypt from 'bcrypt';
import { Validate } from 'class-validator';
import { IsPasswordStrong } from './password-strength.constraint';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Validate(IsPasswordStrong, { always: true })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if(this.password){
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
