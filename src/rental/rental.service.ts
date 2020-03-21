import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Rental } from './rental.entity';

@Injectable()
export class RentalService extends TypeOrmCrudService<Rental> {
  constructor(@InjectRepository(Rental) repo) {
    super(repo);
  }
}
