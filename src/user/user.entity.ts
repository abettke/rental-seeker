import * as bcrypt from 'bcrypt';
import { IsEnum, IsString } from 'class-validator';
import { IsUnique } from '../database/is-unique.validator';
import { IsPasswordStrong } from './password-strength.validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../auth/auth.roles';
import { Rental } from '../rental/rental.entity';

@Entity()
export class User {

  constructor(initial?: Partial<User>) {
    Object.assign(this, initial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsUnique()
  username: string;

  @Column({ select: false })
  @IsPasswordStrong({ always: true })
  password: string;

  @Column({ default: Roles.CLIENT })
  @IsEnum(Roles)
  role: Roles;

  @OneToMany(() => Rental, rental => rental.realtor)
  rentals: Rental[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if(this.password){
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
