import request from 'supertest';
import { getConnection, getRepository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../src/database';
import { AuthenticationModule } from '../src/auth';
import { User } from '../src/user/user.entity';

describe('Authentication API', () => {
  let app: INestApplication;

  const username = 'testLoginUser';
  const password = 'testLoginUserPassword';

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        AuthenticationModule,
      ],
    }).compile()

    app = module.createNestApplication();

    await app.init();
    await getConnection().synchronize(true);
    await getRepository(User).save(new User({ username, password }));
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register', async () => {
    const registration = '/auth/register';
    const username = 'testuser';
    const password = 'averygoodstrongpasswordwow%$@';

    await request(app.getHttpServer())
      .post(registration)
      .send({ username, password })
      .expect(201);

    await request(app.getHttpServer())
      .post(registration)
      .send({ username, password })
      .expect(400)
      .expect((res) => {
        expect(res.body)
          .toMatchObject({
            message: ['This username has already been registered'],
          });
      });

    await request(app.getHttpServer())
      .post(registration)
      .send({
        username: username + '1',
        password: 'weak',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body)
          .toMatchObject({
            message: [ 'password strength is too weak.' ],
          });
      });
  });

  it('POST /auth/login', async () => {
    const login = '/auth/login';

    await request(app.getHttpServer())
      .post(login)
      .send({ username, password })
      .expect(200);

    await request(app.getHttpServer())
      .post(login)
      .send({
        username: 'username',
        password: 'password',
      })
      .expect(401);
  });

  it('GET /auth/user', async () => {
    const userinfo = '/auth/user';
    const { body: auth } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username, password })
      .expect(200);

    await request(app.getHttpServer())
      .get(userinfo)
      .expect(401);

    await request(app.getHttpServer())
      .get(userinfo)
      .auth(auth.accessToken, { type: 'bearer' })
      .expect(200);
  })
});
