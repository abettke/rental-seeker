import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController, CrudRequest, Override, ParsedRequest, ParsedBody } from '@nestjsx/crud';
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
import { RoleGuard } from '../auth/auth.guard.role';
import { Roles } from '../auth/auth.roles';
import { User } from '../user/user.entity';
import { Rental } from './rental.entity';
import { RentalService } from './rental.service';
import { RentalRoutes } from './rental.routes';
import { RequiredRoles } from '../auth/auth.decorator.roles';

@Crud({
  model: {
    type: Rental,
  },
  query: {
    sort: [{ field: 'id', order: 'DESC' }],
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
    if (user.role > Roles.REALTOR) {
      return { available: true };
    }
  },
})
@Controller(RentalRoutes.ROOT)
@UseGuards(JwtAuthGuard, RoleGuard)
export class RentalController implements CrudController<Rental> {
  constructor(public service: RentalService) {}

  get base(): CrudController<Rental> {
    return this;
  }

  @Override()
  @RequiredRoles(Roles.ADMIN, Roles.REALTOR)
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Rental
  ): Promise<Rental> {
    return this.base.createOneBase(req, dto);
  }

  @Override()
  @RequiredRoles(Roles.ADMIN, Roles.REALTOR)
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Rental
  ): Promise<Rental> {
    return this.base.updateOneBase(req, dto);
  }

  @Override()
  @RequiredRoles(Roles.ADMIN, Roles.REALTOR)
  deleteOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.deleteOneBase(req);
  }
}
