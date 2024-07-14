import axios from 'axios';

describe('JSONPlaceholder API Tests', () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    test('GET /posts should return a list of posts', async () => {
        const response = await axios.get(`${baseURL}/posts`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);
    });

    test('GET /posts/1 should return a specific post', async () => {
        const response = await axios.get(`${baseURL}/posts/1`);
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Object);
        expect(response.data.id).toBe(1);
    });

    test('POST /posts should create a new post', async () => {
        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        const response = await axios.post(`${baseURL}/posts`, newPost);
        expect(response.status).toBe(201);
        expect(response.data).toMatchObject(newPost);
        expect(response.data).toHaveProperty('id');
    });

    test('GET /users should return a list of users', async () => {
        const response = await axios.get(`${baseURL}/users`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);
    });

    test('GET /users/1 should return a specific user', async () => {
        const response = await axios.get(`${baseURL}/users/1`);
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Object);
        expect(response.data.id).toBe(1);
    });
});
