import CarsController from 'Homework\controllers\CarsController.js';
import UsersController from 'Homework\controllers\UsersController.js';

const userController =
	new UsersController();
const carsController =
	new CarsController();

beforeAll(async () => {
	await userController.login();
	carsController._axios.defaults.headers.Cookie =
		userController._axios.defaults.headers.Cookie;
	carsController._axios.defaults.headers[
		'Authorization'
	] =
		userController._axios.defaults.headers[
			'Authorization'
		];
	carsController._axios.defaults.headers[
		'Content-Type'
	] = 'application/json';
});

afterAll(async () => {
	const res = await carsController.get(
		carsController.API_CARS
	);
	if (res.status === 200) {
		const cars = res.data.data;
		for (const car of cars) {
			await carsController.deleteCar(
				car.id
			);
		}
	}
});
test('POS-001: Get all car brands and expect status code 200', async () => {
	const res = await carsController.getAllCarBrands();
	expect(res.status).toBe(200);
	expect(res.data.data.length).toBeGreaterThan(0);
  });
  test('POS-002: Get car models and expect status code 200', async () => {
	const res = await carsController.getCarModels();
	expect(res.status).toBe(200);
	expect(res.data.data.length).toBeGreaterThan(0);
  });
  test('POS-003: Create a new car and expect status code 201', async () => {
	const modelsRes = await carsController.getCarModels();
	const model = modelsRes.data.data.find((m) => m.carBrandId);
  
	const carBrandId = model.carBrandId;
	const carModelId = model.id;
	const mileage = 1000;
	const expectedModel = model.title;
  
	const res = await carsController.createCar(carBrandId, carModelId, mileage);
	expect(res.status).toBe(201);
	expect(res.data.data).toHaveProperty('model', expectedModel);
  });
  test('NEG-001: Create a car with an invalid brandId and expect status code 404', async () => {
	const invalidBrandId = 6666; 
	const modelId = 1;  
	const res = await carsController.createCar(invalidBrandId, modelId, 1000);
	expect(res.status).toBe(404);
  });

  test('NEG-002: Create a car with an invalid modelId and expect status code 404', async () => {
	const brandsRes = await carsController.getAllCarBrands();
	const brandId = brandsRes.data.data[0].id;
	const invalidModelId = 3090;  
	const res = await carsController.createCar(brandId, invalidModelId, 3000);
	expect(res.status).toBe(404);
  });
  
  test('NEG-003: Create a car with invalid mileage (negative number) and expect status code 400', async () => {
	const modelsRes = await carsController.getCarModels();
	const model = modelsRes.data.data[0];
	const carBrandId = model.carBrandId;
	const carModelId = model.id;
	const invalidMileage = -500;
	const res = await carsController.createCar(carBrandId, carModelId, invalidMileage);
	expect(res.status).toBe(400);
	expect(res.data.error).toContain('Invalid mileage');
  });

  test('NEG-004: Create a car with non-numeric carBrandId and carModelId and expect status code 400', async () => {
	const nonNumericBrandId = 'invalidBrandId';
	const nonNumericModelId = 'invalidModelId';
	const mileage = 1000;
	const res = await carsController.createCar(nonNumericBrandId, nonNumericModelId, mileage);
	expect(res.status).toBe(400);
	expect(res.data.error).toContain('Invalid carBrandId or carModelId');
  });
	
  test('NEG-005: Create a car without mileage and expect status code 400', async () => {
	const modelsRes = await carsController.getCarModels();
	const model = modelsRes.data.data[0];
    const carBrandId = model.carBrandId;
	const carModelId = model.id;
	const mileage = null; 
    const res = await carsController.createCar(carBrandId, carModelId, mileage);
	expect(res.status).toBe(400);
	expect(res.data.error).toContain('Mileage is required');
  });
  