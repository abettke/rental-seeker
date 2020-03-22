import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from './is-unique.validator';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite3',
      entities: [__dirname + '/../**/*.entity.{ts,js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      migrations: [__dirname + '/migrations/*.{ts,js}'],
      migrationsRun: true,
      migrationsTransactionMode: 'each',
    }),
  ],
  providers: [
    IsUniqueConstraint,
  ],
})
export class DatabaseModule {}
