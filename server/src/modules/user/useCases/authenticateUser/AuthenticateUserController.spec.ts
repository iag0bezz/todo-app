import request from 'supertest';

import { prisma } from '@shared/infra/database/prisma';
import { app } from '@shared/infra/http/app';

/*
  Password: password
*/
const HASHED_PASSWORD =
  '$2b$08$6MtI/rsoItDEPGwN7Vp.DeVELnOOMbSvVcbnKaK0wYiAUSG9r03b.';

describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        username: 'Test Username',
        password: HASHED_PASSWORD,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should be able to authenticate user', async () => {
    const response = await request(app).post('/sessions').send({
      username: 'Test Username',
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('refresh_token');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.username).toBe('Test Username');
  });

  it('should not be able to authenticate user with nonexistent username', async () => {
    const response = await request(app).post('/sessions').send({
      username: 'invalid-username',
      password: 'invalid-password',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('authentication.invalid-credentials');
  });

  it('should not be able to authenticate user with invalid credentials', async () => {
    const response = await request(app).post('/sessions').send({
      username: 'Test Username',
      password: 'invalid-password',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('authentication.invalid-credentials');
  });
});
