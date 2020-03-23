import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { ServeModule } from './serve.module';
import { AuthenticationModule } from './auth';
import { UserModule } from './user';
import { RentalModule } from './rental';

@Module({
  imports: [
    DatabaseModule,
    ServeModule,
    AuthenticationModule,
    UserModule,
    RentalModule,
  ],
})
export class AppModule {}
