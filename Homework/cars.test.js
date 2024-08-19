const axios = require('axios');

const baseURL = 'https://qauto.forstudy.space';
const userCredentials = {
  email: 'viktoriastetsenko2021@gmail.com',
  password: 'BauznhMzz86ErAU'
};

let token = '';
let userId = '';

describe('QAuto Car Management API Tests', () => {
  beforeAll(async () => {
    // Authenticate the existing user
    const loginResponse = await axios.post(`${baseURL}/api/login`, {
      email: userCredentials.email,
      password: userCredentials.password
    });
    token = loginResponse.data.data.token;
    userId = loginResponse.data.data.userId;
  });

  afterAll(async () => {
    // Optionally: Clean up test data here if necessary
  });

  test('Create and verify cars', async () => {
    // Fetch available car brands and models
    const brandsResponse = await axios.get(`${baseURL}/api/cars/brands`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const brands = brandsResponse.data.data;
    expect(brands.length).toBeGreaterThan(0);

    // Create a new car for each brand
    const carIds = [];
    for (const brand of brands) {
      const modelsResponse = await axios.get(`${baseURL}/api/cars/models/${brand.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const models = modelsResponse.data.data;
      expect(models.length).toBeGreaterThan(0);

      const newCarResponse = await axios.post(`${baseURL}/api/cars`, {
        brandId: brand.id,
        modelId: models[0].id,
        registerNumber: `TEST-${Date.now()}`,
        year: 2020
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      carIds.push(newCarResponse.data.data.id);
    }

    // Verify the cars are created
    const carsResponse = await axios.get(`${baseURL}/api/cars`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const cars = carsResponse.data.data;
    expect(cars.length).toBeGreaterThanOrEqual(carIds.length);

    // Clean up: delete the created cars
    for (const carId of carIds) {
      await axios.delete(`${baseURL}/api/cars/${carId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  }, 30000); // Set a timeout of 30 seconds for the test
});
