import UsersController from 'Homework/controllers/UsersController.js';

const userController = new UsersController();

test('Get current user profile', async () => {
	await userController.login();
	const res = await userController.getUserProfile();
	expect(res.status).toBe(200);
	expect(res.data).toHaveProperty('data');
	expect(res.data.data).toHaveProperty('email', 'viktoriastetsenko2021@gmail.com');
});
