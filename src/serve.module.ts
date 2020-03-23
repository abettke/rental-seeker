import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'client'),
      exclude: ['/api*'],
    }),
  ],
})
export class ServeModule {}
