import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
import { RoleGuard } from '../auth/auth.guard.role';
import { Roles } from '../auth/auth.roles';
import { User } from '../user/user.entity';
import { Rental } from './rental.entity';
import { RentalService } from './rental.service';
import { RentalRoutes } from './rental.routes';

@Crud({
  model: {
    type: Rental,
  },
  query: {
    sort: [{ field: 'id', order: 'DESC'}],
    join: {
      realtor: {
        eager: true,
        exclude: ['password'],
      },
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: User) => {
    if(user.role > Roles.REALTOR) {
      return { available: true };
    }
  },
})
@Controller(RentalRoutes.ROOT)
@UseGuards(JwtAuthGuard, RoleGuard)
export class RentalController implements CrudController<Rental> {
  constructor(public service: RentalService) {}
}
