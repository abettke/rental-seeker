import * as bcrypt from 'bcrypt';
import { IsString } from 'class-validator';
import { IsPasswordStrong } from './password-strength.validator';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column()
  @IsPasswordStrong({ always: true })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if(this.password){
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
