import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth.strategy.local';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.authenticateUser(req.user);
  }

}
