import { IsBoolean, IsDate, IsLatLong, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer'
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity'

@Entity()
export class Rental {

  constructor(initial?: Partial<Rental>) {
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

  @Column({ default: true })
  @IsBoolean()
  available: boolean;

  @Column()
  @IsDate()
  createdAt: Date;

  @ManyToOne(() => User, user => user.rentals, {
    eager: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @ValidateNested()
  @Type(() => User)
  realtor: User;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
}
