import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

/**
 * TODO: Move to environment with default?
 * This should move to either an env variable or a secrets provider. For the
 * sake of this being just a test project, this will suffice for time being.
 */
export const JWT_SECRET = 'e1b93c6e-3514-4061-b68d-6874d1fea13f';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: Record<string, any>) {
    const { sub: id } = payload;
    const user: User = await this.userService.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
