import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { AuthenticationModule } from './auth';
import { UserModule } from './user';
import { RentalModule } from './rental';


@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule,
    UserModule,
    RentalModule,
  ],
})
export class AppModule {}
