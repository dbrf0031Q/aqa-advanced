import axios from 'axios';

class BaseController {
	constructor() {
		this._axios = axios.create({
			baseURL: 'https://qauto.forstudy.space/api',
			validateStatus: () => true,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	async login() {
		try {
			const email = 'viktoriastetsenko2021@gmail.com';
			const password = 'BauznhMzz86ErAU';

			const authResp = await this._axios.post('/auth/signin', {
				email,
				password,
				remember: false,
			});

			if (authResp.status === 200) {
				const cookies = authResp.headers['set-cookie'];
				const sidCookie = cookies.find(cookie => cookie.startsWith('sid='));
				if (sidCookie) {
					const sid = sidCookie.split(';')[0];
					this._axios.defaults.headers.Cookie = sid;
					this._axios.defaults.headers['Authorization'] = `Bearer ${sid.split('=')[1]}`;
				} else {
					throw new Error('Session ID cookie not found');
				}
			} else {
				throw new Error(`Login failed with status ${authResp.status}: ${authResp.data.message}`);
			}
		} catch (error) {
			console.error('Error during login:', error.message);
			throw error;
		}
	}

	async get(url) {
		try {
			return await this._axios.get(url);
		} catch (error) {
			console.error(`GET request failed for ${url}:`, error.message);
			throw error;
		}
	}

	async post(url, data) {
		try {
			return await this._axios.post(url, data);
		} catch (error) {
			console.error(`POST request failed for ${url}:`, error.message);
			throw error;
		}
	}

	async delete(url) {
		try {
			return await this._axios.delete(url);
		} catch (error) {
			console.error(`DELETE request failed for ${url}:`, error.message);
			throw error;
		}
	}
}

export default BaseController;
