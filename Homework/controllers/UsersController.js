import BaseController from 'Homework/controllers/BaseController.js';

class UsersController extends BaseController {
	constructor() {
		super();
		this.API_USERS_PROFILE = '/users/profile';
	}

	async getUserProfile() {
		try {
			return await this.get(this.API_USERS_PROFILE);
		} catch (error) {
			console.error('Error fetching user profile:', error.message);
			
			throw error; 
		}
	}
}

export default UsersController;
