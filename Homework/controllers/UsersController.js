import BaseController from 'Homework\controllers\BaseController.js';

class UsersController extends BaseController {
	constructor() {
		super();
		this.API_USERS_PROFILE =
			'/users/profile';
	}
	async getUserProfile() {
		return this.get(
			this.API_USERS_PROFILE
		);
	}
}

export default UsersController;