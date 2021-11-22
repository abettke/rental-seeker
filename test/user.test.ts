import request from 'supertest';
import { getRepository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../src/database';
import { AuthenticationModule } from '../src/auth';
import { UserModule } from '../src/user';
import { User } from '../src/user/user.entity';
import { Roles } from '../src/auth/auth.roles';

describe('User API', () => {
  let app: INestApplication;
  let user: User;
  const tokens: Record<string, string> = {};

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        AuthenticationModule,
        UserModule,
      ],
    }).compile()

    app = module.createNestApplication();

    await app.init();

    const authService = app.get('AuthService');
    const userRepo = getRepository(User);
    const admin = await userRepo.findOneOrFail({ role: Roles.ADMIN });
    const realtor = await userRepo.findOneOrFail({ role: Roles.REALTOR });
    const client = await userRepo.findOneOrFail({ role: Roles.CLIENT });

    user = client;
    tokens.admin = authService.authenticateUser(admin).accessToken;
    tokens.realtor = authService.authenticateUser(realtor).accessToken;
    tokens.client = authService.authenticateUser(client).accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /users', async () => {
    const listUsers = '/users';

    await request(app.getHttpServer())
      .get(listUsers)
      .auth(tokens.admin, { type: 'bearer' })
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeTruthy();
      })

    await request(app.getHttpServer())
      .get(listUsers)
      .auth(tokens.realtor, { type: 'bearer' })
      .expect(200);

    await request(app.getHttpServer())
      .get(listUsers)
      .auth(tokens.client, { type: 'bearer' })
      .expect(403)
  });

  it('GET /user/:id', async () => {
    const detailUser = `/users/${user.id}`;

    await request(app.getHttpServer())
      .get(detailUser)
      .auth(tokens.admin, { type: 'bearer' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined()
        expect(res.body.id).toEqual(user.id);
      });

    await request(app.getHttpServer())
      .get(detailUser)
      .auth(tokens.realtor, { type: 'bearer' })
      .expect(200);

    await request(app.getHttpServer())
      .get(detailUser)
      .auth(tokens.client, { type: 'bearer' })
      .expect(403);
  });
});
