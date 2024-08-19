const axios = require('axios');
const { getAllBrands, getAllModels, createCar, authenticateUser } = require('./helpers'); // Імпортуємо допоміжні функції

const baseURL = 'https://qauto.forstudy.space';
let token = '';

// Функція для авторизації
beforeAll(async () => {
  try {
    const authResponse = await authenticateUser();
    token = authResponse.token;
  } catch (error) {
    console.error('Authentication failed:', error);
  }
});

// Тести
test('Fail to create car without required parameters', async () => {
  try {
    await axios.post(`${baseURL}/cars`, {}, { headers: { 'Authorization': `Bearer ${token}` } });
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
});

test('Fail to create car with non-existent brand', async () => {
  const invalidBrandId = 9999; // Задайте неіснуючий бренд ID
  const models = await getAllModels();

  try {
    await createCar(invalidBrandId, models[0].id);
  } catch (error) {
    expect(error.response.status).toBe(400); // Перевірте відповідний код статусу
  }
});

test('Fail to create car with non-existent model', async () => {
  const brands = await getAllBrands();
  const invalidModelId = 9999; // Задайте неіснуючу модель ID

  try {
    await createCar(brands[0].id, invalidModelId);
  } catch (error) {
    expect(error.response.status).toBe(400); // Перевірте відповідний код статусу
  }
});
