import { MigrationInterface, QueryRunner } from 'typeorm';
import { address, helpers, lorem, random } from 'faker';
import { point as randPoints } from 'geojson-random';
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

    // Bounds for the Charleston, SC area
    const bbox = [-80.025745, 32.715153, -79.854168, 32.859396];
    const points = randPoints(20, bbox).features.map(f => [f.geometry.coordinates[1], f.geometry.coordinates[0]]);
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
            location: `${points[i][0]},${points[i][1]}`,
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
