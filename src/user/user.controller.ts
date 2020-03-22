import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
import { RoleGuard } from '../auth/auth.guard.role';
import { RequiredRoles } from '../auth/auth.decorator.roles';
import { Roles } from '../auth/auth.roles';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRoutes } from './user.routes';
import { UserResponse } from './user.response';

@Crud({
  model: {
    type: User,
  },
  serialize: {
    get: UserResponse,
    create: UserResponse,
    createMany: UserResponse,
    update: UserResponse,
    replace: UserResponse,
    delete: UserResponse,
  },
})
@Controller(UserRoutes.ROOT)
@UseGuards(JwtAuthGuard, RoleGuard)
@RequiredRoles(Roles.ADMIN)
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
