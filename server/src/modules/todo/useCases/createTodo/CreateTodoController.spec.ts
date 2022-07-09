import { User } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

/*
  Password: password
*/
const HASHED_PASSWORD = "$2b$08$6MtI/rsoItDEPGwN7Vp.DeVELnOOMbSvVcbnKaK0wYiAUSG9r03b.";

describe('Create Todo Controller', () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        username: 'Test Username',
        password: HASHED_PASSWORD,
      },
    });
  });

  afterAll(async () => {;
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should be able to create todo', async () => {
    const response_token = await request(app).post('/sessions').send({
      username: 'Test Username',
      password: 'password',
    });

    const { access_token } = response_token.body;

    const response = await request(app)
      .post('/todos')
      .send({
        content: 'Test Content',
        completed: true,
      })
      .set({
        Authorization: `Bearer ${access_token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.content).toBe('Test Content');
    expect(response.body.completed).toBe(true);
  });
});