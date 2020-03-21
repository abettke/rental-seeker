import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../user/user.entity';
import { Roles } from '../../auth/auth.roles';

export class SeedExampleUsers1584801037589 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    const realtors = Array(10).fill('realtor');
    const clients = Array(10).fill('client');

    [].concat(realtors, clients).forEach(async (val, i) => {
      await queryRunner.manager.getRepository(User).save(new User({
        username: `${val}${(i + 1) > 10 ? (i + 1) - 10 : (i + 1)}`,
        password: `${val}${(i + 1) > 10 ? (i + 1) - 10 : (i + 1)}`,
        role: val === 'realtor' ? Roles.REALTOR : Roles.CLIENT,
      }));
    });
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).clear();
  }

}
