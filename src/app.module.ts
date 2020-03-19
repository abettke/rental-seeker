import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { AuthenticationModule } from './auth';
import { UserModule } from './user';


@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule,
    UserModule
  ],
})
export class AppModule {}
