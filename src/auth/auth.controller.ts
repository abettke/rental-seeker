import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth.strategy.local';

@Controller('auth')
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return req.user;
  }

}
