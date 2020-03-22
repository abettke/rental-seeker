import { Body, Controller, Get, HttpCode, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthRoutes } from './auth.routes';
import { AuthFormRegistration} from './auth.form.registration';
import { LocalAuthGuard } from './auth.guard.local';
import { JwtAuthGuard } from './auth.guard.jwt';
import { User } from '../user/user.entity';
import { UserResponse } from '../user/user.response';
import { Repository } from 'typeorm';

@Controller(AuthRoutes.ROOT)
export class AuthController {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private authService: AuthService
  ) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(AuthRoutes.REGISTER)
  async register (
    @Body() registration: AuthFormRegistration,
  ) {
    return this.authService.authenticateUser(await this.userRepo.save(new User(registration)));
  }

  @UseGuards(LocalAuthGuard)
  @Post(AuthRoutes.LOGIN)
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.authenticateUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AuthRoutes.USER)
  getAuthenticatedUser(@Request() req): UserResponse {
    return req.user;
  }

}
