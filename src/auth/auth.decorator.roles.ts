import { SetMetadata } from '@nestjs/common';
import { Roles } from './auth.roles';

export const RequiredRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
