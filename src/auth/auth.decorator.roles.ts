import { SetMetadata } from '@nestjs/common';
import { ROLES } from './auth.constants.roles';

export const RequiredRoles = (...roles: ROLES[]) => SetMetadata('roles', roles);
