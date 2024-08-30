const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const User = require('../models/users');

beforeAll(async () => {
    await db.sync({ force: true });
});

afterAll(async () => {
    await db.close();
});

describe('User Registration', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                nombre: 'Test User',
                email: 'testuser@example.com',
                contraseña: 'password123'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Usuario registrado exitosamente');
        expect(response.body.user).toHaveProperty('user_id');
    });
});
