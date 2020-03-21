import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
import { RoleGuard } from '../auth/auth.guard.role';
import { RequiredRoles } from '../auth/auth.decorator.roles';
import { ROLES } from '../auth/auth.constants.roles';

@Crud({
  model: { type: User },
})
@Controller('users')
@UseGuards(JwtAuthGuard, RoleGuard)
@RequiredRoles(ROLES.ADMIN)
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
