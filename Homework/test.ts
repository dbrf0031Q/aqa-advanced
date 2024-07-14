import axios from 'axios';
describe('JSONPlaceholder API Tests', () => {
const baseURL = 'https://jsonplaceholder.typicode.com';
axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
});
axios.interceptors.response.use((response) => {
    console.log(`Response status: ${response.status}`);
    console.log(`Response data:`, response.data);
    console.log('Response headers:', response.headers);
    return response; 
}, (error) => {
    console.error('Error during request:', error);
    throw error; 
});


    
    test('GET /posts should return a list of posts', async () => {
        try {
            const response = await axios.get(`${baseURL}/posts`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data.length).toBeGreaterThan(0);
        } catch (error) {
            console.error('Error during GET /posts:', error);
            throw error;
        }
    });

    test('GET /posts/1 should return a specific post', async () => {
        try {
            const response = await axios.get(`${baseURL}/posts/1`);
            expect(response.status).toBe(200);
            expect(response.data).toBeInstanceOf(Object);
            expect(response.data.id).toBe(1);
        } catch (error) {
            console.error('Error during GET /posts/1:', error);
            throw error;
        }
    });

    test('POST /posts should create a new post', async () => {
        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };

        try {
            const response = await axios.post(`${baseURL}/posts`, newPost);
            expect(response.status).toBe(201);
            expect(response.data).toMatchObject(newPost);
            expect(response.data).toHaveProperty('id');
        } catch (error) {
            console.error('Error during POST /posts:', error);
            throw error;
        }
    });

    test('POST /posts should create a new post', async () => {
        const newPost = {
            title: 'vika',
            body: 'Stetsenko',
            userId: 2
        };

        try {
            const response = await axios.post(`${baseURL}/posts`, newPost);
            expect(response.status).toBe(201);
            expect(response.data).toMatchObject(newPost);
            expect(response.data).toHaveProperty('id');
        } catch (error) {
            console.error('Error during POST /posts:', error);
            throw error;
        }
    });

    test('GET /users should return a list of users', async () => {
        try {
            const response = await axios.get(`${baseURL}/users`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data.length).toBeGreaterThan(0);
        } catch (error) {
            console.error('Error during GET /users:', error);
            throw error;
        }
    });

    
    test('GET /users/2 should return a specific user', async () => {
        try {
            const response = await axios.get(`${baseURL}/users/2`);
            expect(response.status).toBe(200);
            expect(response.data).toBeInstanceOf(Object);
            expect(response.data.id).toBe(2);
        } catch (error) {
            console.error('Error during GET /users/2:', error);
            throw error;
        }
    });
});
