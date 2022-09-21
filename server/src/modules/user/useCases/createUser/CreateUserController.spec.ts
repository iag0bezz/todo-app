import { prisma } from '@shared/infra/database/prisma';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

describe('Create User Controller', () => {
  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should be able to create user', async () => {
    const response = await request(app).post('/users').send({
      username: 'Test Username',
      password: 'test-password',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body.username).toBe('Test Username');
    expect(response.body.password).not.toBe('test-password');
  });

  it('should not be able to create user with existent username', async () => {
    const response = await request(app).post('/users').send({
      username: 'Test Username',
      password: 'test-password',
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('authentication.user-already-exists')
  });
});