import request from 'supertest';

import { prisma } from '@shared/infra/database/prisma';
import { app } from '@shared/infra/http/app';

/*
  Password: password
*/
const HASHED_PASSWORD =
  '$2b$08$6MtI/rsoItDEPGwN7Vp.DeVELnOOMbSvVcbnKaK0wYiAUSG9r03b.';

describe('Revalidate Token Controller', () => {
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
    await prisma.session.deleteMany();
    await prisma.$disconnect();
  });

  it('should be able to revalidate token', async () => {
    const authentication_response = await request(app).post('/sessions').send({
      username: 'Test Username',
      password: 'password',
    });

    const { refresh_token } = authentication_response.body;

    const response = await request(app).post('/sessions/revalidate').send({
      token: refresh_token,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
  });

  it('should not be able to revalidate token', async () => {
    const response = await request(app).post('/sessions/revalidate').send({
      token: 'INVALID_TOKEN',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('authentication.invalid-token');
  });
});
