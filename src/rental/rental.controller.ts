import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
import { RoleGuard } from '../auth/auth.guard.role';
import { RequiredRoles } from '../auth/auth.decorator.roles';
import { Roles } from '../auth/auth.roles';
import { Rental } from './rental.entity';
import { RentalService } from './rental.service';
import { RentalRoutes } from './rental.routes';

@Crud({
  model: {
    type: Rental,
  },
})
@Controller(RentalRoutes.ROOT)
@UseGuards(JwtAuthGuard, RoleGuard)
@RequiredRoles(Roles.ADMIN)
export class RentalController implements CrudController<Rental> {
  constructor(public service: RentalService) {}
}
