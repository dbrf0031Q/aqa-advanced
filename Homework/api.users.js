import UsersController from 'Homework\controllers\UsersController.js';

const userController =
	new UsersController();

test('Get current user profile', async () => {
	await userController.login();
	const res =
		await userController.getUserProfile();
	expect(res.status).toBe(200);
});