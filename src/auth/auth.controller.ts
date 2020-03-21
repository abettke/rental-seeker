import { Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRoutes } from './auth.routes';
import { LocalAuthGuard } from './auth.guard.local';
import { JwtAuthGuard } from './auth.guard.jwt';

@Controller(AuthRoutes.ROOT)
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(AuthRoutes.LOGIN)
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.authenticateUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AuthRoutes.USER)
  getAuthenticatedUser(@Request() req) {
    return req.user;
  }

}
