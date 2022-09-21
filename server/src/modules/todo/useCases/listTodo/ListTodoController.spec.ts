import { User } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

/*
  Password: password
*/
const HASHED_PASSWORD = "$2b$08$6MtI/rsoItDEPGwN7Vp.DeVELnOOMbSvVcbnKaK0wYiAUSG9r03b.";

describe('List Todo Controller', () => {
  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        username: 'Test Username',
        password: HASHED_PASSWORD, 
      },
    });

    await prisma.todo.createMany({
      data: [
        {
          content: 'Test Content #1',
          completed: true,
          user_id: user.id,
        },
        {
          content: 'Test Content #2',
          completed: false,
          user_id: user.id,
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should be able to list user todos', async () => {
    const response_token = await request(app).post('/sessions').send({
      username: 'Test Username',
      password: 'password',
    });

    const { access_token } = response_token.body;

    const response = await request(app).get('/todos')
      .set({
        Authorization: `Bearer ${access_token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});