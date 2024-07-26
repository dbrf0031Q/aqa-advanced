import axios from 'axios';
class BaseController {
	constructor() {
		this._options = {
			baseURL:
				'https://qauto.forstudy.space/api',
			validateStatus: () => true,
			withCredentials: true,
		};
		this._axios = axios.create(
			this._options
		);
	}

	async login() {
		const authResp =
			await this._axios.post(
				'/auth/signin',
				{
					email: 'searapan@gmail.com',
					password: 'AQAtest2024',
					remember: false,
				}
			);
		const sid =
			authResp.headers[
				'set-cookie'
			][0].split(';')[0];
		this._axios.defaults.headers.Cookie =
			sid;
		this._axios.defaults.headers[
			'Authorization'
		] = `Bearer ${sid.split('=')[1]}`;
		this._axios.defaults.headers[
			'Content-Type'
		] = 'application/json';
	}

	async get(url) {
		return this._axios.get(url);
	}

	async post(url, data) {
		return this._axios.post(url, data);
	}

	async delete(url) {
		return this._axios.delete(url);
	}
}

export default BaseController;