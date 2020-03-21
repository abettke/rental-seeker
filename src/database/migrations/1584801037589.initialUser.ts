import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../user/user.entity';
import { ROLES } from '../../auth/auth.constants.roles';

export class InitialUser1584801037589 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).save(new User({
      username: 'admin',
      password: 'admin',
      role: ROLES.ADMIN,
    }));
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).clear();
  }

}
