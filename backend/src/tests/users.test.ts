import request from 'supertest';
import app, { server } from '../server';

import dotenv from 'dotenv';
dotenv.config();

describe('Test users with MySQL', () => {

    afterAll(done => {
        server.close(done);
      });

    // GET /api/users
    test("GET /api/health", async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toBe(200);
    })


})