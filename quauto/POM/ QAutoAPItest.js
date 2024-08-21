const axios = require('axios');
const qautoConfig = require('../config/qauto.config.js');

class QAutoAPI {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.login = config.user.login;
    this.pass = config.user.pass;
  }

  async authenticate() {
    try {
      const response = await axios.post(`${this.baseUrl}api/auth/login`, {
        email: this.login,
        password: this.pass,
      });
      this.token = response.data.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      return response.data;
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  }

  async addCar(carDetails) {
    try {
      const response = await axios.post(`${this.baseUrl}api/garage/cars`, carDetails);
      return response.data;
    } catch (error) {
      console.error('Failed to add car:', error);
    }
  }

  async addFuelExpense(carId, expenseDetails) {
    try {
      const response = await axios.post(`${this.baseUrl}api/garage/cars/${carId}/expenses`, expenseDetails);
      return response.data;
    } catch (error) {
      console.error('Failed to add fuel expense:', error);
    }
  }
}

module.exports = QAutoAPI;
