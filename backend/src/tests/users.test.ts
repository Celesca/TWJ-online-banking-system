import request from 'supertest';
import app, { server } from '../server';

import dotenv from 'dotenv';
dotenv.config();

describe('Test users with MySQL', () => {
  afterAll((done) => {
    server.close(done);
  });

  // GET /api/users
  test('GET /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });

  test('POST /persons/checkid', async () => {
    const res = await request(app).post('/persons/checkid').send({ national_card_id: '1234567890234' });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No person found with this national card id');
  });

  test('POST /persons/checkid with invalid national_card_id', async () => {
    const res = await request(app).post('/persons/checkid').send({ national_card_id: '123456789' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('National card id should be 13 digits');
  });
});
