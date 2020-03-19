import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './auth.strategy.local';
import { JWT_SECRET } from './auth.strategy.jwt';
import { UserModule } from '../user';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthenticationModule {}
