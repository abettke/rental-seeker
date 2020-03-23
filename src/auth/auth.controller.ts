import { Repository } from 'typeorm';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthRoutes } from './auth.routes';
import { AuthFormRegistration } from './auth.form.registration';
import { AuthResponseJwt } from './auth.response.jwt';
import { LocalAuthGuard } from './auth.guard.local';
import { JwtAuthGuard } from './auth.guard.jwt';
import { User } from '../user/user.entity';
import { UserResponse } from '../user/user.response';

@Controller(AuthRoutes.ROOT)
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private authService: AuthService,
  ) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(AuthRoutes.REGISTER)
  async register(
    @Body() registration: AuthFormRegistration,
  ): Promise<AuthResponseJwt> {
    return this.authService.authenticateUser(
      await this.userRepo.save(new User(registration)),
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post(AuthRoutes.LOGIN)
  @HttpCode(200)
  login(@Request() req): AuthResponseJwt {
    return this.authService.authenticateUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AuthRoutes.USER)
  getAuthenticatedUser(@Request() req): UserResponse {
    return req.user;
  }
}
