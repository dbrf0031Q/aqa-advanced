import BaseController from 'Homework\controllers\BaseController.js';

class CarsController extends BaseController {
	constructor() {
		super();
		this.API_CARS = '/cars';
		this.API_CARS_BRANDS =
			'/cars/brands';
		this.API_CAR_MODELS =
			'/cars/models';
	}

	async getAllCarBrands() {
		return this.get(
			this.API_CARS_BRANDS
		);
	}

	async getCarModels() {
		return this.get(
			this.API_CAR_MODELS
		);
	}

	async createCar(
		carBrandId,
		carModelId,
		mileage
	) {
		const carData = {
			carBrandId: carBrandId,
			carModelId: carModelId,
			mileage: mileage,
		};
		return this.post(
			this.API_CARS,
			carData
		);
	}

	async deleteCar(carId) {
		return this.delete(
			`${this.API_CARS}/${carId}`
		);
	}
}

export default CarsController;