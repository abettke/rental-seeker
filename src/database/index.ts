import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite3',
      entities: [__dirname + '/../**/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
  ],
})
export class DatabaseModule {}
