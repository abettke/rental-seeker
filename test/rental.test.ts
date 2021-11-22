import request from 'supertest';
import { getRepository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../src/database';
import { AuthenticationModule } from '../src/auth';
import { User } from '../src/user/user.entity';
import { RentalModule } from '../src/rental';
import { Rental } from '../src/rental/rental.entity';
import { Roles } from '../src/auth/auth.roles';

describe('Rentals API', () => {
  let app: INestApplication;
  let availableRental: Rental;
  let unavailableRental;
  const tokens: Record<string, string> = {};

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        AuthenticationModule,
        RentalModule,
      ],
    }).compile()

    app = module.createNestApplication();

    await app.init();

    const authService = app.get('AuthService');
    const userRepo = getRepository(User);
    const rentalRepo = getRepository(Rental);
    const realtor = await userRepo.findOneOrFail({ role: Roles.REALTOR });
    const client = await userRepo.findOneOrFail({ role: Roles.CLIENT });

    availableRental = await rentalRepo.findOneOrFail({ available: true });
    unavailableRental = await rentalRepo.findOneOrFail({ available: false });

    tokens.realtor = authService.authenticateUser(realtor).accessToken;
    tokens.client = authService.authenticateUser(client).accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /rentals', async () => {
    const listRentals = '/rentals';

    await request(app.getHttpServer())
      .get(listRentals)
      .auth(tokens.realtor, { type: 'bearer' })
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeTruthy();
      })

    await request(app.getHttpServer())
      .get(listRentals)
      .auth(tokens.client, { type: 'bearer' })
      .expect(200)
      .expect((res) => {
        expect(res.body.every(rental => rental.available === true)).toBe(true);
      });
  });

  it('GET /rentals/:id', async () => {
    const detailUnavailableRental = `/rentals/${unavailableRental.id}`;
    const detailAvailableRental = `/rentals/${availableRental.id}`;

    await request(app.getHttpServer())
      .get(detailUnavailableRental)
      .auth(tokens.realtor, { type: 'bearer' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined()
        expect(res.body.id).toEqual(unavailableRental.id);
      });

    await request(app.getHttpServer())
      .get(detailUnavailableRental)
      .auth(tokens.client, { type: 'bearer' })
      .expect(404);

    await request(app.getHttpServer())
      .get(detailAvailableRental)
      .auth(tokens.client, { type: 'bearer' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.id).toEqual(availableRental.id)
      });
  });

  it('POST /rentals', async () => {
    const createRental = '/rentals';
    const rental: Partial<Rental> = {
      name: '123 Baker Street',
      description: 'Located seaside, downtown. Come check it out!',
      rooms: 3,
      size: 1500,
      location: '32.76217128271575,-79.88685186739589',
      available: true,
      pricePerMonth: 1600,
    };

    await request(app.getHttpServer())
      .post(createRental)
      .auth(tokens.realtor, { type: 'bearer' })
      .send(rental)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(rental);
      });

    await request(app.getHttpServer())
      .post(createRental)
      .auth(tokens.client, { type: 'bearer' })
      .send(rental)
      .expect(403)
  });

  it('PATCH /rentals/:id', async () => {
    const updateRental = `/rentals/${unavailableRental.id}`;

    await request(app.getHttpServer())
      .patch(updateRental)
      .auth(tokens.realtor, { type: 'bearer' })
      .send({ available: true })
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: unavailableRental.id,
          available: true,
        });
      });

    await request(app.getHttpServer())
      .patch(updateRental)
      .auth(tokens.client, { type: 'bearer' })
      .send({ available: false })
      .expect(403)
  });

  it('DELETE /rentals/:id', async () => {
    const deleteRental = `/rentals/${availableRental.id}`;

    await request(app.getHttpServer())
      .delete(deleteRental)
      .auth(tokens.realtor, { type: 'bearer' })
      .expect(200);

    await request(app.getHttpServer())
      .delete(deleteRental)
      .auth(tokens.client, { type: 'bearer' })
      .expect(403);
  });
});
