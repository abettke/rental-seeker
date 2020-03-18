import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
