import { IsDate, IsLatLong, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer'
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity'

@Entity()
export class Rental {

  constructor(initial?: Partial<User>) {
    Object.assign(this, initial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ type: 'text' })
  @IsString()
  description: string;

  @Column()
  @IsNumber()
  size: number;

  @Column()
  @IsNumber()
  rooms: number;

  @Column()
  @IsNumber()
  pricePerMonth: number;

  @Column()
  @IsLatLong()
  location: string;

  @Column()
  @IsDate()
  createdAt: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  @ValidateNested()
  @Type(() => User)
  realtor: User;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
}
