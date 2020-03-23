import { MigrationInterface, QueryRunner } from 'typeorm';
import { address, helpers, lorem, random } from 'faker';
import { User } from '../../user/user.entity';
import { Roles } from '../../auth/auth.roles';
import { Rental } from '../../rental/rental.entity';

export class SeedExampleRentals1584817663777 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const realtors: User[] = await queryRunner.manager
      .getRepository(User)
      .find({
        where: { role: Roles.REALTOR },
      });

    Array(20)
      .fill(true)
      .forEach(async (val, i) => {
        await queryRunner.manager.getRepository(Rental).save(
          new Rental({
            name: address.streetName(),
            description: lorem.sentences(5),
            size: random.number({ min: 1000, max: 4000 }),
            rooms: random.number({ min: 1, max: 4 }),
            pricePerMonth: random.number({ min: 1000, max: 5000 }),
            location: `${address.latitude()},${address.longitude()}`,
            available: !!(i % 2),
            realtor: helpers.shuffle(realtors)[0],
          }),
        );
      });
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Rental).clear();
  }
}
